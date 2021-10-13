import axios from '../config/axios'
import React, { useState } from 'react'
import { useContext } from 'react'
import { Link } from 'react-router-dom'
import { useEffect } from 'react/cjs/react.development'
import Header from '../components/allpages/Header'
import { AuthContext } from '../contexts/AuthContext'
import '../css/learnerProfile.css'
import { ModalContext } from '../contexts/ModalContext'
import { Button, Modal } from 'react-bootstrap';

function LearnProfile() {
  const userId = window.location.href.split('/')[window.location.href.split('/').length - 1]
  const [learnUser, setLearnUser] = useState({})
  const [learnProfile, setLearnProfile] = useState({})
  const [profilePost, setProfilePost] = useState([])
  const [following, setFollowing] = useState([])
  const [follower, setFollower] = useState([])
  const [learnSkill, setLearnSkill] = useState([])
  const [finishedLessonRecord, setFinishedLessonRecord] = useState([])
  const { user } = useContext(AuthContext)
  const [contentText, setContentText] = useState('')
  const [contentPicture, setContentPicture] = useState('')
  const [refresh, setRefresh] = useState(false)
  const [postLike, setPostLike] = useState([])
  const [userPostLike, setUserPostLike] = useState([])
  const { showLogin, setShowLogin, } = useContext(ModalContext)
  const [editPicture, setEditPicture] = useState('')
  const [IsShowComment, setIsShowComment] = useState([])
  const [IsShowCommentReply, setIsShowCommentReply] = useState([])
  const [comment, setComment] = useState('')
  const [postComment, setPostComment] = useState([])
  const [commentReply, setCommentReply] = useState('')
  const [refreshComment, setRefreshComment] = useState(false)
  const [postCommentReply, setPostCommentReply] = useState([])
  const [showAlertConfirm, setShowAlertConfirm] = useState(false)
  const [deleteProfilePostId, setDeleteProfilePostId] = useState('')
  const [IsEdit, setIsEdit] = useState(false)
  const [editPostId, setEditPostId] = useState('')
  const [editCommentId, setEditCommentId] = useState('')
  const [IsEditComment, setIsEditComment] = useState(false)
  const [IsEditCommentReply, setIsEditCommentReply] = useState(false)
  const [editCommentReplyId, setEditCommentReplyId] = useState('')

  const handleClose = () => setShowAlertConfirm(false);
  const handleShow = () => setShowAlertConfirm(true);

  useEffect(() => {
    const run = async () => {
      const { data: { data: learnUser } } = await axios.get(`/userAccount/${userId}`)
      const { data: { data: learnProfile } } = await axios.get(`/LearnerProfile/${userId}`)
      const { data: { data: profilePost } } = await axios.get(`/profilePost/${learnProfile?.id}`)
      const { data: { data: following } } = await axios.get(`/following/${learnProfile?.id}`)
      const { data: { data: follower } } = await axios.get(`/follower/${learnProfile?.id}`)
      const { data: { data: learnSkill } } = await axios.get(`/learnerSkill/${learnProfile?.id}`)
      const { data: { data: lessonsRecord } } = await axios.get(`/lessonsRecord/byUserAccountId/${userId}`)



      const finishedLessonRecord = lessonsRecord.filter(item => item.completed === true)

      const IsShowComment = {}
      profilePost.forEach(item => {
        IsShowComment[item.id] = false;
      })

      const IsShowCommentReply = {}
      postComment.forEach(item => {
        IsShowCommentReply[item.id] = false;
      })

      profilePost.sort((a, b) => b.id - a.id)


      console.log(`learnUser`, learnUser)
      // console.log(`learnProfile`, learnProfile)
      // console.log(`profilePost`, profilePost)
      // console.log(`following`, following)
      // console.log(`follower`, follower)
      // console.log(`learnSkill`, learnSkill)
      // console.log(`lessonsRecord`, lessonsRecord)
      // console.log(`finishedLessonRecord`, finishedLessonRecord)
      // console.log(`IsShowComment`, IsShowComment)
      // console.log(`IsShowCommentReply`, IsShowCommentReply)


      setLearnUser(learnUser)
      setLearnProfile(learnProfile)
      setProfilePost(profilePost)
      setFollowing(following)
      setFollower(follower)
      setLearnSkill(learnSkill)
      setFinishedLessonRecord(finishedLessonRecord)
      setIsShowComment(IsShowComment);

      setIsShowCommentReply(IsShowCommentReply)


    }
    run();
  }, [])

  useEffect(() => {
    const run = async () => {
      const { data: { data: postLike } } = await axios.get(`/postLike/${learnProfile?.id}`)
      const userPostLike = postLike.filter(item => item.userAccountId === user?.id)
      console.log(`postLike`, postLike)
      console.log(`userPostLike`, userPostLike)
      setPostLike(postLike)
      setUserPostLike(userPostLike)

    }
    run()
  }, [learnProfile, refresh])

  useEffect(() => {
    const run = async () => {
      const { data: { data: postComment } } = await axios.get(`/postComment/${learnProfile?.id}`)
      const { data: { data: postCommentReply } } = await axios.get(`/commentReply/${learnProfile?.id}`)
      console.log(`postComment`, postComment)
      console.log(`postCommentReply`, postCommentReply)
      setPostComment(postComment)
      setPostCommentReply(postCommentReply)
    }
    run()
  }, [learnProfile, refreshComment])

  const handleFile = e => {
    e.preventDefault();
    setContentPicture(e.target.files[0])
  }

  const handlePost = async () => {
    const formData = new FormData();
    formData.append('postContent', contentText)
    formData.append('postPicture', contentPicture)
    formData.append('learnerProfileId', learnProfile.id)
    formData.append('userAccountId', user.id)
    console.log(`formData`, formData)
    await axios.post('/profilePost', formData)
    window.location.reload()
  }

  const handleLike = async (profilePostId) => {
    if (user) {
      await axios.post('/postLike', { userAccountId: user.id, profilePostId })
      setRefresh(cur => !cur);
    }
    else {
      setShowLogin(true)
    }
  }

  const handleDisLike = async (profilePostId) => {
    if (user) {
      await axios.delete(`/postLike/${profilePostId}`)
      setRefresh(cur => !cur);
    }

  }

  const handleChangeProfilePicture = e => {
    // e.preventDefault()
    // setEditPicture(e.target.files[0])
    e.preventDefault();
    setEditPicture(e.target.files[0])

  }

  useEffect(() => {
    const run = async () => {
      if (editPicture) {
        const formData = new FormData()
        formData.append('profilePicture', editPicture)
        await axios.put('/userAccount', formData)
        window.location.reload()
      }
    }
    run()

  }, [editPicture])

  const handleShowComment = (postId) => {
    const obj = {}
    for (const [key, value] of Object.entries(IsShowComment)) {
      obj[key] = false
    }
    setIsShowComment(cur => ({ obj, [postId]: true }))
  }

  const handleComment = async (postId) => {
    await axios.post('/postComment', { commentContent: comment, profilePostId: postId })
    setComment('')
    setRefreshComment(cur => !cur)

  }

  const handleShowCommentReply = (postCommentId) => {
    const obj = {}
    for (const [key, value] of Object.entries(IsShowCommentReply)) {
      obj[key] = false
    }
    setIsShowCommentReply(cur => ({ obj, [postCommentId]: true }))
  }

  const handleCommentReply = async (postCommentId) => {
    await axios.post('/commentReply', { commentReplyContent: commentReply, postCommentId: postCommentId })
    setRefreshComment(cur => !cur)
    setCommentReply('')
  }

  const month = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];

  const handleDeletePost = async profilePostId => {
    setShowAlertConfirm(true)
    setDeleteProfilePostId(profilePostId)
  }

  const confirmDelete = async () => {
    const profilePostId = deleteProfilePostId;

    await axios.delete(`/profilePost/${profilePostId}`)
    window.location.reload()
  }

  const handleEdit = async (postId, postContent) => {
    setIsEdit(true)
    setContentText(postContent)
    setEditPostId(postId)

  }

  const handleEditPost = async () => {
    const formData = new FormData();
    formData.append('postContent', contentText)
    formData.append('postPicture', contentPicture ?? null)
    formData.append('learnerProfileId', learnProfile.id)
    formData.append('userAccountId', user.id)
    console.log(`formData`, formData)
    await axios.put('/profilePost', formData)
    window.location.reload()
  }

  const handleDeleteComment = async commentId => {
    await axios.delete(`postComment/${commentId}`)
    setRefreshComment(cur => !cur)
  }

  const handleEditComment = async (commentId, comment) => {
    setIsEditComment(true)
    setEditCommentId(commentId)
    setComment(comment)

  }

  const handleEditCommentPost = async () => {
    const commentId = editCommentId;
    setComment('')
    setIsEditComment(false)
    await axios.put(`postComment/${commentId}`, { commentContent: comment })
    setRefreshComment(cur => !cur)
  }

  const handleDeleteCommentReply = async commentReplyId => {
    await axios.delete(`commentReply/${commentReplyId}`)
    setRefreshComment(cur => !cur)
  }

  const handleEditCommentReply = async (commentReplyId, commentReply) => {
    setIsEditCommentReply(true)
    setEditCommentReplyId(commentReplyId)
    setCommentReply(commentReply)
  }

  const handleEditCommentReplyPost = async () => {
    const commentReplyId = editCommentReplyId;
    setCommentReply('')
    setIsEditCommentReply(false)
    await axios.put(`commentReply/${commentReplyId}`, { commentReplyContent: commentReply })
    setRefreshComment(cur => !cur)
  }

  return (
    <div className='learnProfilePage'>
      <Modal show={showAlertConfirm} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Are you sure!</Modal.Title>
        </Modal.Header>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button onClick={() => confirmDelete()} variant="danger">
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>

      <Header />
      <div className="row">
        <div className="col-6">
          <div className="card p-4 "> {/*AboutMe*/}
            <div className="mb-4 d-flex">
              <div className="">
                <div className=''>
                  <div className='float-end'>
                    {user?.id === learnUser?.id &&
                      <label className="btn btn-info opacity-50 text-light rounded-circle editPicture">
                        <input onChange={handleChangeProfilePicture} className='inputChangeProfilePicture' type="file" />
                        +
                      </label>
                    }
                  </div>
                  <img className='border learnerProfilePicture' src={learnUser.profilePicture} alt="" />
                </div>

              </div>
              <div className="">
                <h2>{learnUser.firstName} {learnUser.lastName}</h2>
                <div className='mt-4'>
                  <div className='badge bg-primary mx-2'>{profilePost.length} post</div> <div className='badge bg-success mx-2'>{following.length} following</div><div className='badge bg-warning text-black mx-2'>{follower.length} follower</div>
                </div>
              </div>
            </div>
            <div className="card p-4">
              <h6>About Me</h6>
              <span>{learnProfile.learnerAboutMe}</span>
            </div>
          </div>
          <div className="card my-4 p-4"> {/*skill*/}
            <span>Skill {learnSkill.map(item => <div key={item.id} className='badge bg-warning text-dark mx-2'>{item.skill}</div>)}</span>

          </div>
          <div className="card"> {/*skill*/}
            {finishedLessonRecord.map(item => (
              <div key={item.id}>
                <div className="card">
                  <div className="row">
                    <div className="col-9">
                      <div className='card ms-2 my-2 p-4' >
                        <div className="row">
                          <div className='col-4'>
                            <div className='badge bg-success'>completed</div>
                            <div className='card mt-3'>
                              <div className="badge bg-warning text-black">{item.endLearnTime.split('-')[0]}</div>
                              <div className="d-flex justify-content-center">
                                <span className='py-2 fw-bold'>{month[item.endLearnTime.split('-')[1]]} {item.endLearnTime.split('-')[2].slice(0, 2)}</span>
                              </div>
                            </div>
                            <div className='d-flex justify-content-center mt-2'>
                              <div className='badge bg-primary'>{(new Date(item.endLearnTime) - new Date(item.startLearnTime)) / 1000 / 60} Minutes</div>
                            </div>
                          </div>
                          <div className="col-8">
                            <p>LESSON: {item.lesson.lessonName}</p>
                            <p>LESSON: {item.lesson.lessonDetail}</p>
                            <button className='btn btn-danger btn-sm float-end'>BOOK ANOTHERS</button>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-3 card d-flex justify-content-center align-items-center">
                      <img className='completedLessonLearnerProfilePicture' src={item.lesson.teacherProfile.userAccount.profilePicture} alt="" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="col-6 border"> {/*board*/}
          {user && <div className="card p-4"> {/*post tool*/}
            <div className="d-flex ">
              <img className='postToolUserPostPicture' src={user.profilePicture} alt="" />
              <div className='d-flex flex-column mx-2 w-75'>
                <textarea value={contentText} onChange={e => setContentText(e.target.value)} className='mb-2' type="text" rows="4" cols="50" placeholder={`What's on your mind, ${user.firstName}`} />
                <div className="mb-3">
                  <label className="postLearnProfileFileInput rounded-pill">
                    <input onChange={handleFile} className='inputFileCustom' type="file" />
                    PHOTO
                  </label>
                  {IsEdit && <button onClick={() => { setIsEdit(false); setContentText(''); }} className='btn btn-danger w-100 mt-2 rounded-pill'>Cancel</button>}
                  <button onClick={IsEdit ? handleEditPost : handlePost} className='btn btn-primary w-100 my-2 rounded-pill'>{IsEdit ? 'UPDATE' : 'POST'}</button>
                </div>
              </div>
            </div>
          </div>}
          {profilePost.map(item => (
            <div className="card p-4" key={item?.id}> {/*post*/}
              <div className=""> {/*user post*/}
                <div className="d-flex justify-content-between align-items-center">
                  <div className="d-flex justify-content-start align-items-center">
                    <img className='postUserProfilePicture' src={item.postUser.profilePicture} alt="" />
                    <div className='d-flex flex-column'>
                      <span className='mx-2 fw-bold'>{item.postUser.firstName} {item.postUser.lastName}</span>
                      <span className='mx-2'>{new Date(item.updatedAt).toUTCString().slice(0, 22)}</span>
                    </div>
                  </div>
                  <div>
                    {user?.id === learnUser?.id && <button onClick={() => handleEdit(item.id, item.postContent, item.postPicture)} className='btn btn-primary'>EDIT</button>}
                    {user?.id === learnUser?.id && <button onClick={() => handleDeletePost(item?.id)} className='btn btn-danger'>X</button>}
                  </div>
                </div>
              </div>
              <div className=" my-2"> {/*content post*/}
                <span>{item.postContent}</span>
                {item.postPicture && <img className='postContentPicture my-2' src={item.postPicture} alt="" />}
              </div>
              <div className="d-flex align-items-center"> {/*like post*/}
                {userPostLike.find(itemP => itemP.profilePostId === item.id) ?
                  <img onClick={() => handleDisLike(item.id)} style={{ width: '30px' }} src="https://cdn-icons-png.flaticon.com/512/2107/2107845.png" alt="" /> :
                  <img onClick={() => handleLike(item.id)} style={{ width: '30px' }} src="https://cdn-icons-png.flaticon.com/512/2107/2107952.png" alt="" />
                }

                <span className='mx-2 fw-bold'>{postLike.filter(itemP => itemP.profilePostId === item.id).length}</span>
              </div>
              <div className='my-2'> {/*comment post*/}
                {!IsShowComment[item.id] && <button onClick={() => handleShowComment(item.id)} className='w-100 btn border'>Comment</button>}

                {IsShowComment[item.id] &&
                  <div className=""> {/*comment tool*/}
                    <div className='d-flex mb-3'>
                      <img style={{ width: '40px', height: '40px', borderRadius: '50%' }} src={user.profilePicture} alt="" />
                      <input value={comment} onChange={e => setComment(e.target.value)} className='ms-1 w-100 border-none' type="text" placeholder={`Write a comment...`} />
                      <button onClick={() => IsEditComment ? handleEditCommentPost() : handleComment(item.id)} className='buttonSendMessage'><i className="fa fa-paper-plane"></i></button>
                    </div >
                    <div>
                      {postComment.filter(itemP => itemP.profilePostId === item.id).map(itemP => (
                        <div key={itemP.id} >
                          <div className="d-flex">
                            <img src={itemP.userAccount.profilePicture} style={{ width: '40px', height: '40px', borderRadius: '50%' }} alt="" />
                            <div className="d-flex flex-column align-items-end">
                              <div className='d-flex flex-column card p-2 mx-2'>
                                <span className='fw-bold'>{itemP.userAccount.firstName} {itemP.userAccount.lastName}</span>
                                <span className=''>{itemP.commentContent}</span>
                              </div>
                              <div className='d-flex'>
                                {user?.id === itemP.userAccount.id && !IsShowCommentReply[itemP.id] && <span onClick={() => handleEditComment(itemP.id, itemP.commentContent)} style={{ fontSize: '14px' }} className='mb-2 mx-2 btn p-0'>Edit</span>}
                                {user?.id === itemP.userAccount.id && !IsShowCommentReply[itemP.id] && <span onClick={() => handleDeleteComment(itemP.id)} style={{ fontSize: '14px' }} className='mb-2 mx-2 btn p-0'>Delete</span>}
                                {!IsShowCommentReply[itemP.id] && <span onClick={() => handleShowCommentReply(itemP.id)} style={{ fontSize: '14px' }} className='mb-2 mx-2 btn p-0'>Reply</span>}
                              </div>
                            </div>
                          </div>
                          {
                            IsShowCommentReply[itemP.id] &&
                            <>
                              {postCommentReply.filter(itemR => itemR.postCommentId === itemP.id).map(itemR => (
                                <div key={itemR.id} >
                                  <div className="d-flex ms-5 mt-2"> {/*commentReply*/}
                                    <img src={itemR.userAccount.profilePicture} style={{ width: '30px', height: '30px', borderRadius: '50%' }} alt="" />
                                    <div className="d-flex flex-column align-items-end">
                                      <div className='d-flex flex-column card p-2 mx-2'>
                                        <span className='fw-bold'>{itemR.userAccount.firstName} {itemR.userAccount.lastName}</span>
                                        <span className=''>{itemR.commentReplyContent}</span>
                                      </div>
                                      {user?.id === itemR.userAccount.id &&
                                        <div div className='d-flex'>
                                          <span onClick={() => handleEditCommentReply(itemR.id, itemR.commentReplyContent)} style={{ fontSize: '14px' }} className='mb-2 mx-2 btn p-0'>Edit</span>
                                          <span onClick={() => handleDeleteCommentReply(itemR.id)} style={{ fontSize: '14px' }} className='mb-2 mx-2 btn p-0'>Delete</span>
                                        </div>
                                      }
                                    </div>
                                  </div>
                                </div>
                              ))}


                              <div className='d-flex mb-3 ms-5 mt-2'> {/*commentReply tool*/}
                                <img style={{ width: '30px', height: '30px', borderRadius: '50%' }} src={user.profilePicture} alt="" />
                                <input value={commentReply} onChange={e => setCommentReply(e.target.value)} className='ms-1 w-100 border-none' type="text" placeholder={`Write a comment...`} />
                                <button onClick={() => IsEditCommentReply ? handleEditCommentReplyPost() : handleCommentReply(itemP.id)} className='buttonSendMessage'><i className="fa fa-paper-plane"></i></button>
                              </div >
                            </>
                          }
                        </div>
                      ))}
                    </div>

                  </div >
                }

              </div>
            </div>
          ))
          }
        </div>
      </div >
    </div >
  )
}

export default LearnProfile
