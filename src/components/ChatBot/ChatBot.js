import { Input, Button } from 'antd';
import { SendOutlined } from '@ant-design/icons';
import { useState } from 'react';
import styles from './chatbot.module.css';

const ChatBot = ({ name }) => {
  const [text, setText] = useState('');
  const [conversations, setConversations] = useState([]);

  const handleSubmit = () => {

  }

  const renderEmpty = () => null;

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
        !conversations.length ? renderEmpty() :
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
  );
};

export default ChatBot;
