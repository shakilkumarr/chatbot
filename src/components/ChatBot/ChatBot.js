import { Input, Button } from 'antd';
import { SendOutlined } from '@ant-design/icons';
import { useState, useRef, useEffect } from 'react';
import _find from 'lodash/find';
import styles from './chatbot.module.css';

const DEFAULT_MSG = "Whoo.. Hooo...! I could not find any result for this query. Could you please try with any other keyword?";

const ChatBot = ({ name, commands }) => {
  const [text, setText] = useState('');
  const [conversations, setConversations] = useState([]);
  const scrollContainerRef = useRef(null);

  const scrollToBottom = () => {
    if (!scrollContainerRef.current) return;
    scrollContainerRef.current.scrollTop = scrollContainerRef.current.scrollHeight;
  };

  useEffect(() => {
    scrollToBottom();
  }, [conversations]);


  const getTheAnswer = () => (_find(commands, ({key, quest}) => {
    const strToMatch = `${key.join('')}${quest}`.toLowerCase();
    const strWithoutSpace = strToMatch.replaceAll(/\s/g,'');
    return strToMatch.indexOf(text.toLowerCase()) > -1 || strWithoutSpace.indexOf(text.toLowerCase()) > -1;
  }) || {}).value || DEFAULT_MSG;

  const handleSubmit = () => {
    if (!commands.length) alert('There is some issue with the Backend data. please check with Admin');
    else {
      const updatedConversations = [
        ...conversations,
        {
          key: text,
          value: getTheAnswer(),
        },
      ];
      setConversations(updatedConversations);
      setText('');
    }
  }

  const renderEmpty = () => (
    <div className={styles.empty}>
      <div>Please go ahead and ask something.</div>
      <div>I am here to help you!</div>
    </div>
  );

  return (
    <div className={styles.main}>
      <Input
        className={styles.input}
        placeholder='Say, Hello...!'
        value={text}
        onChange={ev => setText(ev.target.value)}
        onPressEnter={handleSubmit}
      />
      <Button
        type="primary"
        shape="circle"
        icon={<SendOutlined />}
        className={styles.send}
        onClick={handleSubmit}
      />
      {
        !conversations.length ? renderEmpty() : (
          <div className={styles.chatBody} ref={scrollContainerRef}>
            {
              conversations.map(({key, value}, idx) => (
                <div className={styles.convContainer} key={key+idx}>
                  <div className={`${styles.query} ${styles.row}`}>
                    <div className={styles.userName}>{name}</div>
                    <div className={styles.msg}>{key}</div>
                  </div>
                  <div className={`${styles.reply} ${styles.row}`}>
                    <div className={styles.userName}>Techie Bot</div>
                    <div className={styles.msg}>{value}</div>
                  </div>
                </div>
              ))
            }
          </div>
        ) 
      }
    </div>
  );
};

export default ChatBot;
