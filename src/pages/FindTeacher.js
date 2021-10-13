import axios from '../config/axios';
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useEffect } from 'react/cjs/react.development';
import Header from '../components/allpages/Header';
import Checkbox from '../components/findLessons/Checkbox';
import Radio from '../components/findLessons/Radio';
import Advice from '../components/homepage/Advice';
import Box from '../components/homepage/AdviceLessonCard';

function FindTeacher(props) {
  const topicInitial = {
    'Data Science': false,
    'Business': false,
    'Computer Science': false,
    'Information Technology': false,
    'Language Learning': false,
    'Health': false,
    'Personal Development': false,
    'Physical Science and Engineering': false,
    'Social Sciences': false,
    'Arts and Humanities': false,
    'Math and Logic': false,
  }

  const [topics, setTopics] = useState(topicInitial)
  const [sortby, setSortby] = useState('Highest Score')
  const [lessons, setLessons] = useState([])
  const [reviews, setReviews] = useState([])
  const [lessonsOrderReview, setLessonsOrderReview] = useState([])
  const [lessonsOrderDate, setLessonsOrderDate] = useState([])
  const [filteredTopicLessons, setFilteredTopicLessons] = useState([])

  useEffect(() => {
    const run = async () => {
      const { data: { data: lessons } } = await axios.get('/lessons')
      const { data: { data: reviews } } = await axios.get('/reviews')
      console.log(`lessons`, lessons)
      console.log(`reviews`, reviews)

      //* filter topics
      let filteredTopicLessons = [];
      let haveSelectFilter = false;
      for (const [key, value] of Object.entries(topics)) {
        if (value) {
          haveSelectFilter = true;
          filteredTopicLessons.push(...lessons.filter(item => item.firstTypeTag === key))
        }
      }
      if (!filteredTopicLessons.length && !haveSelectFilter) {
        filteredTopicLessons = [...lessons]
      }

      console.log(`filteredTopicLessons`, filteredTopicLessons)

      //* average all review 
      const averageReview = []
      lessons.forEach(item => {
        const filteredReview = reviews.filter(itemR => itemR.lessonsId === item.id)
        averageReview.push([item.id, filteredReview.reduce((acc, itemR) => (acc + +itemR.reviewPoint), 0) / filteredReview.length])
      })
      averageReview.sort((a, b) => b[1] - a[1])

      console.log(`averageReview`, averageReview)
      //* lessonsOrderReview
      const lessonsOrderReview = []
      averageReview.forEach(item => {
        const result = filteredTopicLessons.find(itemL => itemL.id === item[0])
        if (result) {
          lessonsOrderReview.push(result)
        }
      })
      console.log(`lessonsOrderReview`, lessonsOrderReview)

      //* lessonsOrderDate
      const lessonsOrderDate = [...filteredTopicLessons]
      lessonsOrderDate.sort((a, b) => (new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()))

      console.log(`lessonsOrderDate`, lessonsOrderDate)

      setLessons(lessons)
      setReviews(reviews)
      setLessonsOrderReview(lessonsOrderReview)
      setLessonsOrderDate(lessonsOrderDate)
      setFilteredTopicLessons(filteredTopicLessons)
    }
    run()
  }, [topics, sortby])




  return (
    <div>
      <Header />
      <div className="row"> {/* filters lessons*/}
        <div className="col-12">
          <div className="dropdown d-flex justify-content-end">
            <button className="btn btn-warning dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
              Filters Lessons
            </button>
            <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
              <div className="d-flex">
                <div className='mx-2'>
                  <h5>Topics</h5>
                  <Checkbox name='Data Science' state={topics} setState={setTopics} />
                  <Checkbox name='Business' state={topics} setState={setTopics} />
                  <Checkbox name='Computer Science' state={topics} setState={setTopics} />
                  <Checkbox name='Information Technology' state={topics} setState={setTopics} />
                  <Checkbox name='Language Learning' state={topics} setState={setTopics} />
                  <Checkbox name='Health' state={topics} setState={setTopics} />
                  <Checkbox name='Personal Development' state={topics} setState={setTopics} />
                  <Checkbox name='Physical Science and Engineering' state={topics} setState={setTopics} />
                  <Checkbox name='Social Sciences' state={topics} setState={setTopics} />
                  <Checkbox name='Arts and Humanities' state={topics} setState={setTopics} />
                  <Checkbox name='Math and Logic' state={topics} setState={setTopics} />
                </div>
                <div className='mx-5' style={{ padding: '0px 50px' }}>
                  <h5>Sort by</h5>
                  <Radio name='Newest' state={sortby} setState={setSortby} />
                  <Radio name='Highest Score' state={sortby} setState={setSortby} />
                </div>
              </div>
            </ul>
          </div>
        </div>
      </div>

      <div className="growskill"> {/*lesson card*/}
        <h1>Grow Your Skill</h1>
      </div>

      <div className="content d-flex flex-wrap">

        {sortby === 'Highest Score' ?
          lessonsOrderReview.map((item, index) => (
            <Box lessons={item} reviews={reviews} key={item?.id} />
          )) :
          lessonsOrderDate.map((item, index) => (
            <Box lessons={item} reviews={reviews} key={item?.id} />
          ))
        }
      </div>
    </div >
  )
}

export default FindTeacher
