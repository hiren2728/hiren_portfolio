import React, { useRef, useState} from "react";
import { toast } from 'react-toastify';
import { Audio, ColorRing } from  'react-loader-spinner'
import "./Email.css";
import {useGetContactsQuery} from "../../Api/dataAPI";
import emailjs from "@emailjs/browser";

const Email = (e) => {
    const form = useRef();
    const [reqLoading, setReqLoading] = useState(false);

    const sendEmail = (e) => {
        e.preventDefault();
        setReqLoading(true);
        emailjs
            .sendForm(
                process.env.REACT_APP_SERVICE_ID,
                process.env.REACT_APP_TEMPLATE_ID,
                form.current,
                process.env.REACT_APP_USER_ID
            )
            .then(
                (result) => {
                    console.log(result.text);
                    setReqLoading(false);
                    toast("Your message send successfully.");
                    e.target.reset();
                },
                (error) => {
                    console.log(error.text);
                    setReqLoading(false);
                    toast("Something went wrong. Please try again.");
                    e.target.reset();
                }
            );
    };

    const {data: contactsDetails} = useGetContactsQuery();

    return (
        <div id="contact">
            <div className="reachme-container">
                <div className="reachme-title2">
                    <h2>I Want To Hear From You</h2>

                    <h3>Contact Me</h3>
                </div>
                <div className="row">
                    <div className="col-md-5">
                        <div className="reachme-title">
                            <div className="row">
                                {contactsDetails &&
                                contactsDetails.map((details) => (
                                    <div className="contact-info" key={details.id}>
                                        <div className="contact-details">
                                            <i className={details.icon}/>
                                            <div className="contact-mi">
                                                <h4 className="icon-name">{details.contact_name}:</h4>
                                                <p className="d-name">{details.contact_info}</p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6 email-me container">
                        <form
                            action=""
                            className="contact-form"
                            ref={form}
                            onSubmit={sendEmail}
                        >
                            <div className="row">
                                <div className="col-md-12 mb-3 hire-me-title"/>
                                <div className="col-md-6 ">
                                    <input
                                        type="text"
                                        name="user_name"
                                        id=""
                                        placeholder="Enter Your Name"
                                        required
                                    />
                                </div>
                                <div className="col-md-6 ">
                                    <input
                                        type="email"
                                        name="user_email"
                                        id="emailID"
                                        placeholder="Enter Your Email"
                                        required
                                    />
                                </div>
                                <div className="col-md-12">
                                    <input
                                        type="text"
                                        name="subject"
                                        id=""
                                        placeholder="Enter Subject"
                                        required
                                    />
                                </div>
                                <div className="col-md-12 mb-2">
                  <textarea
                      name="message"
                      id=""
                      cols="60"
                      rows="8"
                      placeholder="Your Message"
                      required
                  />
                                    {
                                        reqLoading ? (
                                            <ColorRing
                                                visible={true}
                                                height="80"
                                                width="80"
                                                ariaLabel="blocks-loading"
                                                wrapperStyle={{}}
                                                wrapperClass="blocks-wrapper"
                                                colors={['#59c378', '#eff30e', "#17c0e9", "#c96ddd", "#f45162"]}
                                            />
                                        ) : (
                                            <button className="hire-btn" type="submit">
                                                Send Message
                                            </button>
                                        )
                                    }
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Email;
