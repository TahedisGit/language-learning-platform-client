import { useState } from "react";

export default function ManagePackages() {
  const [type, setType] = useState("");
  const [formData, setFormData] = useState({
    packageName: "",
    questionSets: [
      {
        subType: "",
        question: "",
        options: ["", "", "", ""],
        correctAnswer: "",
        clue: "",
        image: null,
        audio: null,
      },
    ],
  });

  const handleInputChange = (e, setIdx) => {
    const { name, value, files } = e.target;
    // console.log("value", value, "files", files);
    const newQuestionSets = [...formData.questionSets];
    if (files) {
      newQuestionSets[setIdx][name] = files[0];
    } else {
      newQuestionSets[setIdx][name] = value;
    }
    setFormData({ ...formData, questionSets: newQuestionSets });
  };

  const handleOptionChange = (index, value, setIdx) => {
    const newQuestionSets = [...formData.questionSets];
    newQuestionSets[setIdx].options[index] = value;
    setFormData({ ...formData, questionSets: newQuestionSets });
  };

  const handleSubtypeChange = (value, setIdx) => {
    const newQuestionSets = [...formData.questionSets];
    newQuestionSets[setIdx].subType = value;
    setFormData({ ...formData, questionSets: newQuestionSets });
  };

  const addQuestionSet = () => {
    setFormData({
      ...formData,
      questionSets: [
        ...formData.questionSets,
        {
          subtype: "",
          question: "",
          options: ["", "", "", ""],
          correctAnswer: "",
          clue: "",
          image: null,
          audio: null,
        },
      ],
    });
  };

  const removeQuestionSet = (index) => {
    const newQuestionSets = formData.questionSets.filter((_, i) => i !== index);
    setFormData({ ...formData, questionSets: newQuestionSets });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const finalData = {
      name: formData.packageName,
      type: type,
      package_id: crypto.randomUUID(),
      questions: formData.questionSets.map((set) => {
        if (type === "reading") {
          const optionsWithId = set.options.map((opt, idx) => ({
            text: opt,
            isCorrect: opt === set.correctAnswer,
            option_id: `option-${idx + 1}`,
          }));

          return {
            id: crypto.randomUUID(),
            type: type,
            subType: set.subType,
            questionText: set.question,
            options: optionsWithId,
            clue: set.clue,
            ...(set.subType === "image-based" && { imageUrl: set.image }),
          };
        } else {
          return {
            id: crypto.randomUUID(),
            type: type,
            questionText: set.question,
            audioUrl: set.audio,
            answer: set.correctAnswer,
          };
        }
      }),
    };

    console.log("Final JSON Data:", finalData);

    // FormData for API request
    const formDataToSend = new FormData();
    formDataToSend.append("name", finalData.name);
    formDataToSend.append("type", finalData.type);
    formDataToSend.append("package_id", finalData.package_id);

    // Loop through each question set
    finalData.questions.forEach((question, idx) => {
      formDataToSend.append(`questions[${idx}][id]`, question.id);
      formDataToSend.append(`questions[${idx}][type]`, question.type);
      formDataToSend.append(
        `questions[${idx}][questionText]`,
        question.questionText
      );
      formDataToSend.append(`questions[${idx}][clue]`, question.clue || "");

      if (question.type === "reading") {
        formDataToSend.append(`questions[${idx}][subType]`, question.subType);

        question.options.forEach((opt, i) => {
          formDataToSend.append(
            `questions[${idx}][options][${i}][text]`,
            opt.text
          );
          formDataToSend.append(
            `questions[${idx}][options][${i}][isCorrect]`,
            opt.isCorrect
          );
          formDataToSend.append(
            `questions[${idx}][options][${i}][option_id]`,
            opt.option_id
          );
        });
        if (question.subType === "image-based" && question.imageUrl) {
          formDataToSend.append(
            `questions[${idx}][imageUrl]`,
            question.imageUrl
          );
        }
      } else if (question.type === "listening" && question.audioUrl) {
        formDataToSend.append(`questions[${idx}][audioUrl]`, question.audioUrl);
        formDataToSend.append(`questions[${idx}][answer]`, question.answer);
      }
    });
    console.log("FormData to send:", formDataToSend);
    console.log("image", formDataToSend.get("questions[0][imageUrl]"));

    // ✅ Send to backend
    try {
      const response = await fetch(
        "https://language-learning-platform-server.onrender.com/add-package",
        {
          method: "POST",
          body: formDataToSend,
        }
      );

      if (response.ok) {
        alert("Package uploaded successfully!");

        // ✅ Clear the form after success
        setType("");
        setFormData({
          packageName: "",
          questionSets: [
            {
              subType: "",
              question: "",
              options: ["", "", "", ""],
              correctAnswer: "",
              clue: "",
              image: null,
              audio: null,
            },
          ],
        });
      } else {
        throw new Error("Failed to upload package.");
      }
    } catch (err) {
      console.error("Upload failed", err);
      alert("Upload failed! Please try again.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-2xl mx-auto p-6 bg-white rounded-xl shadow space-y-4"
    >
      <h2 className="text-2xl font-semibold">Manage Packages</h2>

      <input
        type="text"
        name="packageName"
        placeholder="Package Name"
        value={formData.packageName}
        onChange={(e) =>
          setFormData({ ...formData, packageName: e.target.value })
        }
        className="w-full border p-2 rounded"
        required
      />

      <select
        value={type}
        onChange={(e) => setType(e.target.value)}
        className="w-full border p-2 rounded"
        required
      >
        <option value="">Select Type</option>
        <option value="reading">Reading</option>
        <option value="listening">Listening</option>
      </select>

      {formData.questionSets.map((set, setIdx) => (
        <div key={setIdx} className="space-y-4">
          <h3 className="text-lg font-semibold">Question Set {setIdx + 1}</h3>

          {type === "reading" && (
            <>
              <select
                value={set.subType}
                onChange={(e) => handleSubtypeChange(e.target.value, setIdx)}
                className="w-full border p-2 rounded"
                required
              >
                <option value="">Select SubType</option>
                <option value="image-based">Image Based</option>
                <option value="multiple">Multiple Choice</option>
              </select>

              {set.subType === "image-based" && (
                <input
                  type="file"
                  name="image"
                  accept="image/*"
                  onChange={(e) => handleInputChange(e, setIdx)}
                  className="w-full"
                />
              )}

              <input
                type="text"
                name="question"
                placeholder="Enter question"
                value={set.question}
                onChange={(e) => handleInputChange(e, setIdx)}
                className="w-full border p-2 rounded"
                required
              />

              {[0, 1, 2, 3].map((idx) => (
                <input
                  key={idx}
                  type="text"
                  placeholder={`Option ${idx + 1}`}
                  value={set.options[idx]}
                  onChange={(e) =>
                    handleOptionChange(idx, e.target.value, setIdx)
                  }
                  className="w-full border p-2 rounded"
                  required
                />
              ))}

              <input
                type="text"
                name="correctAnswer"
                placeholder="Correct Answer"
                value={set.correctAnswer}
                onChange={(e) => handleInputChange(e, setIdx)}
                className="w-full border p-2 rounded"
                required
              />

              <input
                type="text"
                name="clue"
                placeholder="Clue (optional)"
                value={set.clue}
                onChange={(e) => handleInputChange(e, setIdx)}
                className="w-full border p-2 rounded"
              />
            </>
          )}

          {type === "listening" && (
            <>
              <input
                type="file"
                name="audio"
                accept="audio/*"
                onChange={(e) => handleInputChange(e, setIdx)}
                className="w-full"
              />

              <input
                type="text"
                name="question"
                placeholder="Enter question"
                value={set.question}
                onChange={(e) => handleInputChange(e, setIdx)}
                className="w-full border p-2 rounded"
                required
              />

              <input
                type="text"
                name="correctAnswer"
                placeholder="Correct Answer"
                value={set.correctAnswer}
                onChange={(e) => handleInputChange(e, setIdx)}
                className="w-full border p-2 rounded"
                required
              />
            </>
          )}

          {formData.questionSets.length > 1 && (
            <button
              type="button"
              onClick={() => removeQuestionSet(setIdx)}
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded mt-2"
            >
              Delete Question Set
            </button>
          )}
        </div>
      ))}

      <div className="flex justify-between items-center">
        <button
          type="button"
          onClick={addQuestionSet}
          className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded mt-4"
        >
          Add Question Set
        </button>

        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded mt-4"
        >
          Upload Package
        </button>
      </div>
    </form>
  );
}
