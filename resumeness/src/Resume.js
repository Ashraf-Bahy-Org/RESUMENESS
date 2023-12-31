// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
//import { useRef} from "react"; we didnt need it as we accessed the form by the e.target so no need for it
import { useNavigate } from "react-router-dom";
import { useState } from "react";
const Resume = () => {
    const navigate = useNavigate();




    

    const handleSubmit = async (e) => {
        e.preventDefault();
        //    setTimeout(() => {        how to navigate back then to the reqired page ?
        const formData = new FormData(e.target);
        const values = Object.fromEntries(formData.entries());
        try {
            await fetch('http://localhost:8080/addcv', {
              method: 'POST',
              body: JSON.stringify(values),
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('token')}`, // Assuming you store the token in localStorage
              },
            });
            console.log(values);
            // Handle successful upload
          } catch (error) {
            alert(error);
            // Handle error
          }
        navigate("./Preview", {
            state: values,
        });
        //   }, 1);
    };

    const handleWorkDelete = () => {
        let arr = [...inputFields];
        arr.pop();
        setInputFields(arr);
    };

    const handleEduDelete = () => {
        let arr = [...eduinputFields];
        arr.pop();
        setEduInputFields(arr);
    };

    const handleSkillDelete = () => {
        let arr = [...skillinputFields];
        arr.pop();
        setSkillInputFields(arr);
    };

    const handleCrtDelete = () => {
        let arr = [...crtinputFields];
        arr.pop();
        setCrtInputFields(arr);
    };

    const handleLangDelete = () => {
        let arr = [...langinputFields];
        arr.pop();
        setLangInputFields(arr);
    };

    const handleHobbDelete = () => {
        let arr = [...hobbinputFields];
        arr.pop();
        setHobbInputFields(arr);
    };

    // const [isVisible, setIsVisible] = useState([]);

    // const toggleVisibility = (index) => {
    //     let arr = [...skillinputFields];
    //     arr[index] = !arr[index];
    //     setIsVisible(arr);

    // };

    const [inputFields, setInputFields] = useState([]);

    const handleAddField = () => {
        setInputFields([...inputFields, ""]);
        // setIsVisible([...inputFields, true]);
    };

    const [eduinputFields, setEduInputFields] = useState([]);

    const handleAddFieldEdu = () => {
        setEduInputFields([...eduinputFields, ""]);
    };

    const [skillinputFields, setSkillInputFields] = useState([]);

    const handleAddFieldSkill = () => {
        setSkillInputFields([...skillinputFields, ""]);
    };

    const [crtinputFields, setCrtInputFields] = useState([]);

    const handleAddFieldCrt = () => {
        setCrtInputFields([...crtinputFields, ""]);
    };

    const [langinputFields, setLangInputFields] = useState([]);

    const handleAddFieldLang = () => {
        setLangInputFields([...langinputFields, ""]);
    };

    const [hobbinputFields, setHobbInputFields] = useState([]);

    const handleAddFieldHobb = () => {
        setHobbInputFields([...hobbinputFields, ""]);
    };

    return (
        <form action="" className="form" onSubmit={handleSubmit}>
            <div className="boxes">
                <h1>Personal information</h1>
                <div className="inner">
                    <ul>
                        <li>Full name:</li>
                        <input type="text" name="name" required />
                        <li>
                            Contact information:
                            <ol>
                                <li>address:</li>
                                <input type="text" name="address" required />
                                <li>phone number:</li>
                                <input type="text" name="number" required />
                                <li>email:</li>
                                <input type="email" name="email" required />
                            </ol>
                        </li>
                        <li>LinkedIn profile: *</li>
                        <input type="text" name="LI" />
                        <li>Website or portfolio links: *</li>
                        <input type="text" name="links" />
                    </ul>
                </div>
            </div>

            <div className="boxes">
                <h1>Professional Summary:</h1>
                <ul>
                    <li>
                        give us a professional background, skills, and career
                        goals:
                    </li>
                </ul>
                <textarea name="summary" id="" rows={10} cols={110}></textarea>
            </div>
            <div className="boxes">
                <h1>Work Experience</h1>
                <ul>
                    <li>
                        Job Objective: (a specific job title or career
                        objective)
                    </li>
                </ul>
                <textarea
                    name="title"
                    id="freetextarea"
                    rows={6}
                    cols={90}
                ></textarea>

                <div className="inner">
                    {inputFields.map((field, index) => (
                        <div className="block visible">
                            <h2> Job number : {index + 1}</h2>
                            <div key={index} className="work">
                                <div>
                                    <label>Job title: </label>
                                    <input
                                        type="text"
                                        className="smallinput"
                                        name={`title${index}`}
                                        required
                                    />
                                </div>
                                <div>
                                    <label>Company name: </label>
                                    <input
                                        type="text"
                                        className="smallinput"
                                        name={`compname${index}`}
                                        required
                                    />
                                </div>
                                <div>
                                    <label>Company location: </label>
                                    <input
                                        type="text"
                                        className="smallinput"
                                        name={`comploc${index}`}
                                        required
                                    />
                                </div>
                                <div>
                                    <label>Start date - End date: </label>
                                    <input
                                        type="text"
                                        className="smallinput"
                                        name={`date${index}`}
                                        required
                                    />
                                </div>
                                <div id="widefield">
                                    <label>
                                        A brief description about your job
                                        there: *{" "}
                                    </label>
                                    <textarea
                                        type="text"
                                        rows={4}
                                        cols={90}
                                        name={`desc${index}`}
                                    />
                                </div>
                            </div>
                            {/* <button
                                onClick={toggleVisibility}
                                className={isVisible ? "active" : ""}
                            >
                                {isVisible[index] ? "-" : "+"}
                            </button> */}
                        </div>
                    ))}

                    <div class="rightflex">
                        <div>
                            {inputFields.length > 0 && (
                                <button
                                    type="button"
                                    className="delete"
                                    onClick={handleWorkDelete}
                                >
                                    delete work field
                                </button>
                            )}
                        </div>
                        <button type="button" onClick={handleAddField}>
                            add work field
                        </button>
                    </div>
                </div>
            </div>
            <div className="boxes">
                <h1>Education</h1>
                <div className="inner">
                    <ul>
                        <li>Degrees earned: (e.g., Bachelor's, Master's)</li>
                        <input type="text" name="degrees" required />
                        <li>Field of Study</li>
                        <input type="text" name="field" required />
                    </ul>
                    <div>
                        {eduinputFields.map((field, index) => (
                            <div>
                                <h2> Institution number : {index + 1}</h2>
                                <div key={index} className="work">
                                    <div>
                                        <label>Institution name: </label>
                                        <input
                                            type="text"
                                            className="smallinput"
                                            name={`instname${index}`}
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label>Graduation date: </label>
                                        <input
                                            type="text"
                                            className="smallinput"
                                            name={`instdate${index}`}
                                            required
                                        />
                                    </div>
                                    <div id="widefield">
                                        <label>Location of institution: </label>
                                        <input
                                            type="text"
                                            className="smallinput"
                                            name={`instloc${index}`}
                                            required
                                        />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div class="rightflex">
                        <div>
                            {eduinputFields.length > 0 && (
                                <button
                                    type="button"
                                    className="delete"
                                    onClick={handleEduDelete}
                                >
                                    delete educational institution
                                </button>
                            )}
                        </div>
                        <button type="button" onClick={handleAddFieldEdu}>
                            Add educational institution
                        </button>
                    </div>
                </div>
            </div>

            <div className="boxes">
                <h1>Skills</h1>
                <div className="inner">
                    {skillinputFields.map((field, index) => (
                        <div>
                            <h2> Skill number : {index + 1}</h2>
                            <div key={index} className="work">
                                <div>
                                    <label>Skill name: </label>
                                    <input
                                        type="text"
                                        className="smallinput"
                                        name={`skill${index}`}
                                        required
                                    />
                                </div>
                                <div>
                                    <label>Percentage of mastery: </label>
                                    <input
                                        type="number"
                                        className="smallinput"
                                        name={`skillprc${index}`}
                                        required
                                    />
                                </div>
                            </div>
                        </div>
                    ))}
                    <div class="rightflex">
                        <div>
                            {skillinputFields.length > 0 && (
                                <button
                                    type="button"
                                    className="delete"
                                    onClick={handleSkillDelete}
                                >
                                    delete skill
                                </button>
                            )}
                        </div>
                        <button type="button" onClick={handleAddFieldSkill}>
                            add skill
                        </button>
                    </div>
                </div>
            </div>

            <div className="boxes">
                <h1>Certificates</h1>
                <div className="inner">
                    {crtinputFields.map((field, index) => (
                        <div>
                            <h2> Certificate number : {index + 1}</h2>
                            <div key={index} className="work">
                                <div>
                                    <label>Certificate name: </label>
                                    <input
                                        type="text"
                                        className="smallinput"
                                        name={`crt${index}`}
                                        required
                                    />
                                </div>
                            </div>
                        </div>
                    ))}
                    <div class="rightflex">
                        <div>
                            {crtinputFields.length > 0 && (
                                <button
                                    type="button"
                                    className="delete"
                                    onClick={handleCrtDelete}
                                >
                                    delete Certificate
                                </button>
                            )}
                        </div>
                        <button type="button" onClick={handleAddFieldCrt}>
                            add Certificate
                        </button>
                    </div>
                </div>
            </div>

            <div className="boxes">
                <h1>Languages</h1>
                <div className="inner">
                    {langinputFields.map((field, index) => (
                        <div>
                            <h2> Language number : {index + 1}</h2>
                            <div key={index} className="work">
                                <div>
                                    <label>Language name: </label>
                                    <input
                                        type="text"
                                        className="smallinput"
                                        name={`lang${index}`}
                                        required
                                    />
                                </div>
                                <div>
                                    <label>Percentage of Mastery: </label>
                                    <input
                                        type="number"
                                        className="smallinput"
                                        name={`langprc${index}`}
                                        required
                                    />
                                </div>
                            </div>
                        </div>
                    ))}
                    <div class="rightflex">
                        <div>
                            {langinputFields.length > 0 && (
                                <button
                                    type="button"
                                    className="delete"
                                    onClick={handleLangDelete}
                                >
                                    delete language
                                </button>
                            )}
                        </div>
                        <button type="button" onClick={handleAddFieldLang}>
                            add language
                        </button>
                    </div>
                </div>
            </div>

            <div className="boxes">
                <h1>Hobbies and interests</h1>
                <div className="inner">
                    {hobbinputFields.map((field, index) => (
                        <div>
                            <h2> hobby number : {index + 1}</h2>
                            <div key={index} className="work">
                                <div>
                                    <label>hobby name: </label>
                                    <input
                                        type="text"
                                        className="smallinput"
                                        name={`hobb${index}`}
                                        required
                                    />
                                </div>
                            </div>
                        </div>
                    ))}
                    <div class="rightflex">
                        <div>
                            {hobbinputFields.length > 0 && (
                                <button
                                    type="button"
                                    className="delete"
                                    onClick={handleHobbDelete}
                                >
                                    delete hobby
                                </button>
                            )}
                        </div>
                        <button type="button" onClick={handleAddFieldHobb}>
                            add hobby
                        </button>
                    </div>
                </div>
            </div>
            <div className="butdiv">
            <button className="but" type="submit">
                Create your cv
            </button>
            </div>
        </form>
    );
};

export default Resume;
