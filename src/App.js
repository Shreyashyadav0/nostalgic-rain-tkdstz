import React, { useState } from "react";
import Modal from "react-modal";
import "./styles.css";

Modal.setAppElement("#root");

function App() {
  const [turnoutData, setTurnoutData] = useState({
    male9: 0,
    female9: 0,
    tg9: 0,
    male11: 0,
    female11: 0,
    tg11: 0,
    male1: 0,
    female1: 0,
    tg1: 0,
    male5: 0,
    female5: 0,
    tg5: 0,
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTime, setSelectedTime] = useState("");
  const [inputData, setInputData] = useState({ male: 0, female: 0, tg: 0 });

  const [buttonsState, setButtonsState] = useState({
    verifyVoter: false,
    mockPollDone: false,
    pollingStarted: false,
    isQueueAfter6: false,
    pollingClose: false,
  });

  const totalVoters = 991;

  const calculatePercentage = (count) =>
    ((count / totalVoters) * 100).toFixed(2);

  const openModal = (time) => {
    setSelectedTime(time);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInputData({
      ...inputData,
      [name]: parseInt(value, 10),
    });
  };

  const handleSubmit = () => {
    setTurnoutData((prevData) => ({
      ...prevData,
      [`male${selectedTime}`]: inputData.male,
      [`female${selectedTime}`]: inputData.female,
      [`tg${selectedTime}`]: inputData.tg,
    }));
    closeModal();
  };

  const isUpdated = (time) =>
    turnoutData[`male${time}`] > 0 ||
    turnoutData[`female${time}`] > 0 ||
    turnoutData[`tg${time}`] > 0;

  const handleButtonClick = (buttonName) => {
    setButtonsState((prevState) => ({
      ...prevState,
      [buttonName]: !prevState[buttonName],
    }));
  };

  return (
    <div className="App">
      <header className="header">
        <div className="voter-info">
          <p>Male: 527</p>
          <p>Female: 460</p>
          <p>TG: 4</p>
          <p>Total: 991</p>
        </div>
      </header>
      <div className="button-section">
        <button
          className={`control-button ${
            buttonsState.verifyVoter ? "updated" : ""
          }`}
          onClick={() => handleButtonClick("verifyVoter")}
        >
          Verify Voter
        </button>
        <button
          className={`control-button ${
            buttonsState.mockPollDone ? "updated" : ""
          }`}
          onClick={() => handleButtonClick("mockPollDone")}
        >
          Mock Poll Done
        </button>
        <button
          className={`control-button ${
            buttonsState.pollingStarted ? "updated" : ""
          }`}
          onClick={() => handleButtonClick("pollingStarted")}
        >
          Polling Started
        </button>
      </div>
      <div className="turnout-section">
        {["9", "11", "1", "5"].map((time) => (
          <div
            key={time}
            className={`turnout-box ${isUpdated(time) ? "updated" : ""}`}
            onClick={() => openModal(time)}
          >
            <h3>Voter turnout till {time} o'clock</h3>
            <p>
              Male: {turnoutData[`male${time}`]} (
              {calculatePercentage(turnoutData[`male${time}`])}%)
            </p>
            <p>
              Female: {turnoutData[`female${time}`]} (
              {calculatePercentage(turnoutData[`female${time}`])}%)
            </p>
            <p>
              Third Gender: {turnoutData[`tg${time}`]} (
              {calculatePercentage(turnoutData[`tg${time}`])}%)
            </p>
            <p>
              Total Votes:{" "}
              {turnoutData[`male${time}`] +
                turnoutData[`female${time}`] +
                turnoutData[`tg${time}`]}{" "}
              (
              {calculatePercentage(
                turnoutData[`male${time}`] +
                  turnoutData[`female${time}`] +
                  turnoutData[`tg${time}`]
              )}
              %)
            </p>
          </div>
        ))}
      </div>
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Enter Voter Turnout Data"
        className="modal"
        overlayClassName="overlay"
      >
        <h2>Enter Voter Turnout Data till {selectedTime} o'clock</h2>
        <form>
          <label>
            Male:
            <input
              type="number"
              name="male"
              value={inputData.male}
              onChange={handleInputChange}
            />
          </label>
          <label>
            Female:
            <input
              type="number"
              name="female"
              value={inputData.female}
              onChange={handleInputChange}
            />
          </label>
          <label>
            Third Gender:
            <input
              type="number"
              name="tg"
              value={inputData.tg}
              onChange={handleInputChange}
            />
          </label>
          <button type="button" onClick={handleSubmit}>
            Submit
          </button>
        </form>
      </Modal>
      <div className="button-section">
        <button
          className={`control-button ${
            buttonsState.isQueueAfter6 ? "updated" : ""
          }`}
          onClick={() => handleButtonClick("isQueueAfter6")}
        >
          Is there queue at PS after 6
        </button>
        <button
          className={`control-button ${
            buttonsState.pollingClose ? "updated" : ""
          }`}
          onClick={() => handleButtonClick("pollingClose")}
        >
          Polling Close
        </button>
      </div>
    </div>
  );
}

export default App;
