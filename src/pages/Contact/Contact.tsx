import { useState } from "react";
import s from "./Contact.module.scss";
import Button from "../../components/ui/ButtonApp/ButtonApp";
import contactImg from '../../assets/imgs/contact-us.png';
import ModalApp from "../../components/ui/ModalApp/ModalApp";


const ContactUs = () => {
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState<boolean>(false)

  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSuccessModalOpen(true);
    setName('');
    setEmail('');
    setMessage('');
  };

  return (
  <>
    <ModalApp isModalOpen={isSuccessModalOpen}>
              <h3>Success!</h3>
              <p>Your request has been sent.</p>
              <div className={s.button_block}>
                  <Button title={"Ok"} onClick={() => setIsSuccessModalOpen(false)}/>
              </div>
      </ModalApp>

      <section className={s.contact_us}>
          <div className={s.contact_us__body}>
          <div className={s.contact_us__img}>
              <img src={contactImg} alt="contactUs__img" loading='lazy' />
            </div>
            <form className={s.contact_us__text} onSubmit={handleSubmit}>
              <div className={s.contact_us__data}>
                <label>
                  <span>Name</span>
                  <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    autoComplete="off"
                    onChange={(e)=>setName(e.target.value)}
                    value={name}
                  />
                </label>
                <label>
                  <span>Email*</span>
                  <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    autoComplete="on"
                    onChange={(e)=>setEmail(e.target.value)}
                    value={email}
                    required
                  />
                </label>
                <label>
                  <span>Message*</span>
                  <textarea
                    className={s.contact_us__textarea_message}
                    name="message"
                    rows={6}
                    placeholder="Message"
                    maxLength={250}
                    onChange={(e)=>setMessage(e.target.value)}
                    value={message}
                    required
                  />
                </label>
              </div>
              <Button title="Send Message" max_width="550px" />
              <div> * - required fields</div>
            </form>
          </div>
      </section>
      </>
  );
};

export default ContactUs;
