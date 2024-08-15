import React, { useEffect, useRef, useState } from "react";
import emailjs from "emailjs-com";

const StructureForm = () => {
  const formtemp = useRef();
  // name
  const [name, setName] = useState("");
  const [nameTouched, setNameTouched] = useState(false);
  const [nameMsgError, setNameMsgError] = useState(false);

  // subject
  const [subject, setSubject] = useState("");
  const [subjectTouched, setSubjectTouched] = useState(false);
  const [subjectMsgError, setSubjectMsgError] = useState(false);

  // email
  const [email, setEmail] = useState("");
  const [emailTouched, setEmailTouched] = useState(false);
  const [emailMsgError, setEmailMsgError] = useState(false);

  //message
  const [message, setMessage] = useState("");
  const [messageTouched, setMessageTouched] = useState(false);
  const [messageMsgError, setMessageMsgError] = useState(false);

  const handleNameChange = (e) => {
    const value = e.target.value;
    if (e.target.name === "user-name") setName(value);
  };
  const handleSubjectChange = (e) => {
    const value = e.target.value;
    if (e.target.name === "user-subject") setSubject(value);
  };
  const handleEmailChange = (e) => {
    const value = e.target.value;
    if (e.target.name === "user-email") setEmail(value);
  };
  const handleMessageChange = (e) => {
    const value = e.target.value;
    if (e.target.name === "user-message") setMessage(value);
  };

  // for name:
  useEffect(() => {
    if (nameTouched) validationNameMethod(name);
  }, [name, nameTouched]);

  // for subject
  useEffect(() => {
    if (subjectTouched) validationSubjectMethod(subject);
  }, [subject, subjectTouched]);

  // for email:
  useEffect(() => {
    if (emailTouched) validationEmailMethod(email);
  }, [email, emailTouched]);

  // for message
  useEffect(() => {
    if (messageTouched) validationMessageMethod(message);
  }, [message, messageTouched]);

  // ---------------------- Validtion Methods ----------------------------------------

  // for name:
  const validationNameMethod = (name) => {
    if (name === "") {
      setNameMsgError(true);
    } else {
      setNameMsgError(false);
    }
  };

  // for subject:
  const validationSubjectMethod = (subject) => {
    if (subject === "") {
      setSubjectMsgError(true);
    } else {
      setSubjectMsgError(false);
    }
  };

  // for email:
  const validationEmailMethod = (email) => {
    let emailReg =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@(([^<>()[\]\\.,;:\s@"]+\.)+[^<>()[\]\\.,;:\s@"]{2,})$/i;
    if (!emailReg.test(email)) {
      setEmailMsgError(true);
    } else {
      setEmailMsgError(false);
    }
  };

  // for message
  const validationMessageMethod = (message) => {
    if (message === "") {
      setMessageMsgError(true);
    } else {
      setMessageMsgError(false);
    }
  };

  const sendEmails = (e) => {
    e.preventDefault();

    validationNameMethod(name);
    validationSubjectMethod(subject);
    validationEmailMethod(email);
    validationMessageMethod(message);

    setNameTouched(true);
    setSubjectTouched(true);
    setEmailTouched(true);
    setMessageTouched(true);

    if (
      nameMsgError ||
      subjectMsgError ||
      emailMsgError ||
      messageMsgError ||
      name === "" ||
      subject === "" ||
      email === "" ||
      message === ""
    ) {
      return;
    }

    emailjs
      .sendForm(
        process.env.REACT_APP_YOUR_SERVICE_ID,
        process.env.REACT_APP_YOUR_TEMPLATE_ID,
        formtemp.current,
        process.env.REACT_APP_YOUR_PUBLIC_KEY
      )
      .then(
        (res) => {
          console.log("E-mail sent:", res.text);
          console.log("Status:", res.status);
        },
        (error) => {
          console.log("There was an error:", error.text);
        }
      );
  };
  return (
    <form
      className="flex flex-col items-start mx-4"
      onSubmit={(e) => {
        sendEmails(e);
      }}
      ref={formtemp}
    >
      <input
        className="border-black border-2 p-2 my-4"
        type="text"
        size={50}
        placeholder="Your name"
        name="user-name"
        value={name}
        onChange={handleNameChange}
        onBlur={() => setNameTouched((d) => !d)}
      />
      {nameMsgError && (
        <span className="text-red-600 font-bold text-sm">
          Fill the field with your name.
        </span>
      )}
      <input
        className="border-black border-2 p-2 my-4"
        type="text"
        size={50}
        placeholder="Subject"
        name="user-subject"
        value={subject}
        onChange={handleSubjectChange}
        onBlur={() => setSubjectTouched((d) => !d)}
      />
      {subjectMsgError && (
        <span className="text-red-600 font-bold text-sm">
          Fill the field with your subject.
        </span>
      )}
      <input
        className="border-black border-2 p-2 my-4"
        type="email"
        size={50}
        placeholder="Your e-mail"
        name="user-email"
        value={email}
        onChange={handleEmailChange}
        onBlur={() => setEmailTouched((d) => !d)}
      />
      {emailMsgError && (
        <span className="text-red-600 font-bold text-sm">
          Fill the field with youe E-mail.
        </span>
      )}
      <input
        className="border-black border-2 p-2 my-4"
        type="url"
        size={50}
        placeholder="Your URL Website (if exists)*"
        name="user-url"
      />
      <textarea
        className="border-black border-2 p-2 my-4"
        rows={7}
        cols={52}
        placeholder="How can I serve you?*"
        name="user-message"
        value={message}
        onChange={handleMessageChange}
        onBlur={() => setMessageTouched((d) => !d)}
      ></textarea>
      {messageMsgError && (
        <span className="text-red-600 font-bold text-sm">
          Please, Tell me what's going on in your mind!
        </span>
      )}
      <button className="border-black border-2 p-2 m-4" type="submit">
        Submit
      </button>
    </form>
  );
};

export default StructureForm;
