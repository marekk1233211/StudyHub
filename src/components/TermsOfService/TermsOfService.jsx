import styles from "./TermsOfService.module.scss";
const TermsOfService = ({ theme }) => {
  const wrapperClasses = `${styles.wrapper} ${
    theme === "dark" ? styles.dark : styles.light
  }`;
  return (
    <div className={wrapperClasses}>
      <h1>TERMS OF USE FOR STUDYHUB SERVICE </h1>
      <h2>Introduction </h2>
      <p>
        The StudyHub is an online platform that allows users to upload content
        in the form of text and graphics. When using the Service, you are bound
        by these terms and conditions, which outline the rules for using the
        Service and prohibit the upload of inappropriate content.
      </p>
      <h2> Prohibited Content</h2>
      <p>
        You are not allowed to upload or post content on the Service that: Is
        illegal or violates the laws applicable in Poland. Is offensive, racist,
        sexist, violent, or promotes hatred. Violates copyrights or intellectual
        property rights of others. Contains pornographic or erotic content.{" "}
      </p>
      <h2>User Responsibility</h2>
      <p>
        Users of the Service are responsible for the content they upload or
        post. Individuals who breach these terms and conditions may face
        consequences, including content removal, access restriction to the
        Service, or other legal actions.
      </p>
      <h2>Content Moderation</h2>
      <p>
        StudyHub Service reserves the right to moderate content uploaded by
        users. Uploading content that breaches these terms and conditions is
        strictly prohibited, and the Service has the right to remove such
        content.
      </p>{" "}
      <h2>Privacy Protection</h2>
      <p>
        StudyHub Service is committed to protecting user privacy. Personal data
        is stored and processed in compliance with applicable data protection
        regulations.
      </p>
      <h2>Contact</h2>
      <p>
        In the event of a breach of these terms and conditions or questions
        regarding the Service, please contact the administrator at the following
        email address: marekkorczakprogramowanie@gmail.com.
      </p>
      <h2>Summary </h2>
      <p>
        The StudyHub Service Terms of Use are designed to provide a safe
        environment for users and ensure compliance with the relevant legal
        regulations. By using the Service, users accept and agree to adhere to
        these terms and conditions.
      </p>
    </div>
  );
};

export default TermsOfService;
