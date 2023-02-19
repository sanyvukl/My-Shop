import "./contact.styles.scss";
import { useState } from "react";
import { Card } from "../../components/import.components";
import { FaEnvelope, FaPhoneAlt, FaTwitter } from "react-icons/fa";
import { GoLocation } from "react-icons/go";

const Contact = () => {
    const [mail, setMail] = useState({
        user_name: "",
        user_email: "",
        subject: "",
        message: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;

        setMail({ ...mail, [name]: value });
    }

    const sendEmail = () => {

    }

    return (
        <section>
            <div className="container contact">
                <h2>Contact</h2>
                <div className="section">
                    <form onSubmit={sendEmail}>
                        <Card cardClass={"card"}>
                            <label>Name</label>
                            <input type="text" name="user_name" onChange={handleChange} value={mail.user_name} placeholder="Full Name" required />

                            <label htmlFor="">Email</label>
                            <input type="text" name="user_email" onChange={handleChange} value={mail.user_email} placeholder="Email" required />

                            <label htmlFor="">Subject</label>
                            <input type="text" name="subject" onChange={handleChange} value={mail.subject} placeholder="Subject" required />

                            <label htmlFor="">Your Message</label>
                            <textarea name="message" id="" cols="30" onChange={handleChange} value={mail.message} rows="10">
                            </textarea>

                            <a href={`mailto:${"alex@gmail.com"}?Subject=${mail.user_name + "\n" + mail.subject}&body=${mail.message}`}>
                                <button className="--btn --btn-primary">
                                    Send Message
                                </button>
                            </a>
                        </Card>
                    </form>
                    <div className="details">
                        <Card cardClass={"card2"}>
                            <h3>Our Contact Information</h3>
                            <p>Fill the form or contact us via ither channels listed below</p>
                            <div className="icons">

                                <span>
                                    <FaPhoneAlt color="#fff" />
                                    <p>+279 200 2222</p>
                                </span>

                                <span>
                                    <FaEnvelope color="#fff" />
                                    <p>support@gmail.com</p>
                                </span>
                                <span>
                                    <GoLocation color="#fff" />
                                    <p>San Francisco, USA</p>
                                </span>

                                <span>
                                    <FaTwitter color="#fff" />
                                    <p>@AlexVuk</p>
                                </span>

                            </div>
                        </Card>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Contact;