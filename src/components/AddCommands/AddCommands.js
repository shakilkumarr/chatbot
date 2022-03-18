import { Modal, Button, Input } from 'antd';
import { useState } from 'react';
import { doc, query, where, getDocs, collection, addDoc } from "firebase/firestore"; 

import { auth, db } from "../../auth/firebase";

import styles from './addCommands.module.css';

const AddCommands = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isPosting, setPostingStatus] = useState(false);
  const [key, setKey] = useState('');
  const [value, setValue] = useState('');
  const [quest, setQuest] = useState('');

  const showModal = () => {
    setIsModalVisible(true);
  };

  const resetForm = () => {
    setPostingStatus(false);
    setKey('');
    setValue('');
    setQuest('');
  }

  const handleOk = async () => {
    if (isPosting || !key || !quest || !value) return;
    setPostingStatus(true);
    await addDoc(collection(db, "commands"), {
      key: key.split(','),
      value,
      quest,
    });
    resetForm();
    alert('Data Added');
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const renderModalContent = () => {
    return (
      <div className={styles.body}>
        <div className={styles.row}>
          <div className='label'>Key</div>
          <Input value={key} onChange={ev => setKey(ev.target.value)} />
        </div>
        <div className={styles.row}>
          <div className='label'>Value</div>
          <Input value={value} onChange={ev => setValue(ev.target.value)} />
        </div>
        <div className={styles.row}>
          <div className='label'>Question</div>
          <Input value={quest} onChange={ev => setQuest(ev.target.value)} />
        </div>
      </div>
    )
  }

  return (
    <>
      <Button type="primary" onClick={showModal}>
        Add Commands
      </Button>
      <Modal
        title="Basic Modal"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        width={800}
      >
      {renderModalContent()}
      </Modal>
    </>
  )
}

export default AddCommands;
