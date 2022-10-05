import React, { useEffect, useState } from 'react';
import Button from '../components/Button';
import { TextField } from '@material-ui/core';
import '../styling/style.css'
import { useTransition, animated } from 'react-spring';
import QuestionForm from '../models/QuestionForm.js'

import questionImage from '/Users/kaiyatakahashi/Desktop/my-first-project/src/images/festivals.jpg';
import WarningText from '../components/WarningText';

const QuestionFormView = ({ open, onClose }) => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [interest, setInterest] = useState('');
    const [other, setOther] = useState('');
    const [isEmailValid, setIsEmailValid] = useState(true);

    function handleName(val) {
        setName(val.target.value);
    }
    function handleEmail(val) {
        setEmail(val.target.value);
    }
    function handlePhone(val) {
        setPhone(val.target.value);
    }
    function handleInterest(val) {
        setInterest(val.target.value);
    }
    function handleOther(val) {
        setOther(val.target.value);
    }

    function sentButtonTapped() {
        const validateEmail = (val) => {
            return val.match(
              /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            );
          };
        // Validate Email 
        if (validateEmail(email)) {
            // If valid
            setIsEmailValid(true);
            const newQuestionForm = new QuestionForm(name, email, phone, interest, other);
            localStorage.setItem(newQuestionForm.email, newQuestionForm.name + ", (" + newQuestionForm.phone + ") " + newQuestionForm.interest + ", " + newQuestionForm.other);
        } else {
            // If invalid
            // display text under the email textfield.
            setIsEmailValid(false);
            console.log("invalid");
        }
    }

    // Animation: slide view from left side
    const transition = useTransition(open,{
        from: { x: -400, opacity: 0 },
        enter: { x: 0, opacity: 1 },
        config: { mass:1, tension:10, friction:0, clamp: true }
    });

    if (!open) {
        return null
    }
    return (
        <div id='question-form-image-view'>
            <div id='question-form-box'>
                <h2 id='question-title'>HAVING QUESTIONS ABOUT HOSTING TASTTLIG?</h2>
                {transition((style, item) =>
                    item? 
                    <animated.div style={style} id='question-form-container'>
                        <div id='question-title-button-flex'>
                            <span></span>
                            <h3 className='title-with-line'>Drop us a line!</h3>
                            <button id='question-form-x-button' onClick={onClose}>X</button>
                        </div>
                        <form id='question-form-grid'>
                            <div id='name-tf'>
                                <input 
                                    type="text"
                                    required
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    placeholder="Name"
                                />
                            </div>
                            <div id='email-tf'>
                                <input 
                                    type="text"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Email*"
                                />
                                <WarningText text={"Please enter a valid email address."} isHidden={isEmailValid}></WarningText>
                            </div>
                            <div id='phone-tf'>
                                <input 
                                    type="text"
                                    required
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                    placeholder="Phone"
                                />
                            </div>
                            <div id='interest-tf'>
                                <input 
                                    type="text"
                                    required
                                    value={interest}
                                    onChange={(e) => setInterest(e.target.value)}
                                    placeholder="I'm interested in"
                                    id='bigger-input'
                                />
                            </div>
                            <div id='other-tf'>
                                <input 
                                    type="text"
                                    required
                                    value={other}
                                    onChange={(e) => setOther(e.target.value)}
                                    placeholder="Other notes"
                                    id='bigger-input'
                                />
                            </div>
                        </form>
                        <p id='question-form-text'>This site is protected by reCAPTCHA and the Google <a href='https://policies.google.com/privacy'>Privacy Policy</a> and <a href='https://policies.google.com/terms'>Terms of Serviece</a> apply.</p>
                        <Button prompt="SEND" onClick={sentButtonTapped} id='send-button'></Button>
                    </animated.div> : ''
                )}
            </div>
        </div>
        );
};


export default QuestionFormView;