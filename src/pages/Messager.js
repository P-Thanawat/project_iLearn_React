import React, { useRef, useState, useEffect, useContext } from 'react'
import '../css/messenger.css'
import { io } from "socket.io-client";
import { ListGroup, Form, InputGroup, Button } from 'react-bootstrap'
import Header from '../components/allpages/Header';
import { AuthContext } from '../contexts/AuthContext';
import axios from 'axios';
import { DataForMessengerContext } from '../contexts/DataForMessenger';

function Messenger() {
  const { user } = useContext(AuthContext)
  const [message, setMessage] = useState([])
  const [contacts, setContacts] = useState([])
  const [selectCoversation, setSelectCoversation] = useState('')
  const [text, setText] = useState('')
  const [refreshMessage, setRefreshMessage] = useState(false)
  const ref = useRef(null);
  const { dataForMessenger } = useContext(DataForMessengerContext)


  useEffect(() => {
    setText(dataForMessenger?.message)
    setSelectCoversation(dataForMessenger?.messageTo)
  }, [])

  useEffect(() => {
    const run = async () => {
      const { data: { data: messageData } } = await axios.get(`/userMessenger/${user?.id}`)
      console.log(`messageData`, messageData)

      const contacts = [];
      messageData.forEach(item => {
        if (item.messageFrom === user.id && !contacts.find(contact => contact.id === item.messageTo)) {
          contacts.push(item.messageToUser);
        }
        if (item.messageTo === user.id && !contacts.find(contact => contact.id === item.messageFrom)) {
          contacts.push(item.messageFromUser);
        }
      })
      console.log(`contacts`, contacts)
      setMessage(messageData)
      setContacts(contacts)


    }
    run()
  }, [refreshMessage])

  useEffect(() => {
    const scroll = ref.current.scrollHeight
    ref.current.scrollTo(0, scroll)
  }, [refreshMessage, selectCoversation])

  // useEffect(() => {
  //   const newSocket = io(
  //     'http://localhost:5000',
  //     { query: { id: user.id } }
  //   )
  //   setSocket(newSocket)

  //   return () => newSocket.close()
  // }, [user.id])

  const socket = io('http://localhost:9000');
  socket.on("connect", () => {
    console.log(socket.id); // x8WIv7-mJelg7on_ALbx
  });
  socket.on("disconnect", () => {
    console.log(socket.id); // undefined
  });



  const handleSubmit = async e => {
    e.preventDefault();
    // socket.emit('send-message', { selectCoversation, text })
    await axios.post('userMessenger', { message: text, messageFrom: user.id, messageTo: selectCoversation })
    setText('')
    setRefreshMessage(cur => !cur)

  }

  // useEffect(() => {
  //   if (socket == null) return

  //   socket.on('receive-message', handleSubmit)

  //   return () => socket.off('receive-message')
  // }, [socket, handleSubmit])


  return (
    <div className='messengerPage'>
      <Header />
      <div className="row">
        <div className="col-3"> {/*select user*/}
          <ListGroup variant="flush">
            {contacts.map(item => (
              <ListGroup.Item key={item.id} action active={item.id === selectCoversation} onClick={() => setSelectCoversation(item.id)} >{item.firstName} {item.lastName}</ListGroup.Item>
            ))}


          </ListGroup>
        </div>
        <div className="col-9"> {/*message*/}
          <div className="d-flex flex-column">
            <div ref={ref} className="scroll ">
              <div className="d-flex flex-column align-items-start justify-content-end px-3 ">
                {message.filter(item => item.messageTo === selectCoversation || item.messageFrom === selectCoversation).map(item => (
                  <div key={item.id} className={`my-1 d-flex flex-column ${item.messageFrom === user.id ? 'align-self-end align-items-end' : 'align-items-start'}`}>
                    <div className={`rounded px-2 py-1 ${item.messageFrom === user.id ? 'bg-primary text-white' : 'border'}`}>
                      {item.message}
                    </div>
                    <div className={`text-muted small ${item.messageFrom === user.id ? 'text-right' : ''}`}>
                      {item.messageFrom === user.id ? 'You' : item.messageFromUser.firstName}
                    </div>
                  </div>
                ))}
              </div>

            </div>
            <Form onSubmit={handleSubmit}>
              <Form.Group className="m-2">
                <InputGroup>
                  <Form.Control
                    as="textarea"
                    required
                    value={text}
                    onChange={e => setText(e.target.value)}
                    style={{ height: '75px', resize: 'none' }}
                  />
                  <Button type="submit">Send</Button>
                </InputGroup>
              </Form.Group>
            </Form>
          </div>
        </div>
      </div>

    </div >
  )

}

export default Messenger
