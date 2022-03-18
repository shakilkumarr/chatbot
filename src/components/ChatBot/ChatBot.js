import styles from './chatbot.module.css';

const ChatBot = ({ name }) => (
  <div className={styles.main}>CHat Bot {name}</div>
);

export default ChatBot;
