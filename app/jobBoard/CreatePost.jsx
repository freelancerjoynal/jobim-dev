import React, { useState } from "react";
import { FaAngleDown, FaMapMarkerAlt, FaWhatsapp } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import Lottie from "react-lottie-player";
import loadingAnimation from "@/app/assets/loader.json";

export default function CreatePost({
  setCreateHeight,
  professions,
  areas,
  setPosts,
  setSuccessMsg,
}) {
  const [formData, setFormData] = useState({
    publisher: "",
    profession: "",
    area: "",
    location: "",
    description: "",
    email: "",
    wa: "",
  });

  const [errors, setErrors] = useState({});
  const [submitStatus, setSubmitStatus] = useState(null);
  const [loading, setLoading] = useState(false);
  const [buttonClass, setButtonClass] = useState("bg-[#6D03DE]");

  const handleChange = (e) => {
    const { id, value } = e.target;

    // Handle WhatsApp field specifically
    let newValue = value;
    if (id === "wa") {
      // Add country code if typing starts
      if (newValue && !newValue.startsWith("+972")) {
        newValue = "+972" + newValue.replace("+972", "");
      }
      // Remove country code if backspace is used
      if (newValue.startsWith("+972") && newValue.length <= 4) {
        newValue = newValue.replace("+972", "");
      }
    }

    setFormData((prevFormData) => ({
      ...prevFormData,
      [id]: newValue,
    }));

    // Reset errors for the current field if it changes
    if (errors[id]) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [id]: null,
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.publisher) newErrors.publisher = "שם מפרסם המשרה חובה";
    if (!formData.profession) newErrors.profession = "תפקיד חובה";
    if (!formData.area) newErrors.area = "אזור המשרה חובה";
    if (!formData.description) newErrors.description = "תיאור העבודה חובה";
    if (!formData.email) newErrors.email = "אימייל לשליחת קורות חיים חובה";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      setButtonClass("bg-red-500");
      return;
    }

    try {
      setLoading(true);
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/create-post`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (!response.ok) throw new Error("Network response was not ok");

      const result = await response.json();
      setSuccessMsg(true);
      setPosts(result.posts);

      window.scrollTo({ top: 0, behavior: "smooth" });

      setCreateHeight("0");
      setSubmitStatus("success");
      setFormData({
        publisher: "",
        profession: "",
        area: "",
        location: "",
        description: "",
        email: "",
        wa: "",
      });
      setButtonClass("bg-[#6D03DE]"); // Reset button color
    } catch (error) {
      console.error("Error:", error);
      setSubmitStatus("error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="px-9 py-7 bg-white rounded-lg">
      <h2 className="text-3xl sm:text-[40px] text-center bg-[#FBF8FF] font-bold text-[#6D03DE] py-3 rounded-lg">
        יצירת משרה חדשה
      </h2>
      <h4 className="text-2xl font-bold mt-5 pb-2">מילוי פרטי המשרה</h4>
      <hr />
      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Publisher Field */}
        <div className="pt-1 sm:py-2 relative">
          <label
            htmlFor="publisher"
            className="font-semibold text-xl block text-[#344054] py-2"
          >
            שם מפרסם המשרה
          </label>
          <input
            className={`block border w-full py-2 sm:py-4 px-3 sm:px-5 rounded-lg text-[#667085] text-right sm:text-2xl ${
              errors.publisher ? "border-red-500" : "border-[#D0D5DD]"
            }`}
            placeholder="ישראל ישראלי"
            id="publisher"
            type="text"
            value={formData.publisher}
            onChange={handleChange}
          />
          {errors.publisher && (
            <p className="text-red-500 text-sm">{errors.publisher}</p>
          )}
        </div>

        {/* Profession Field */}
        <div className="py-2 relative">
          <label
            htmlFor="profession"
            className="font-semibold text-xl block text-[#344054] sm:py-2"
          >
            תפקיד
          </label>
          <div className="relative">
            <select
              id="profession"
              className={`block appearance-none border w-full py-2 sm:py-4 px-3  pr-10 rounded-lg text-[#667085] text-right text-xl sm:text-2xl ${
                errors.profession ? "border-red-500" : "border-[#D0D5DD]"
              }`}
              value={formData.profession}
              onChange={handleChange}
            >
              <option value="">בחר תפקיד</option>
              {professions.map((item) => (
                <option key={item.profession_id} value={item.profession_id}>
                  {item.profession_name}
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center px-2 text-gray-700">
              <FaAngleDown />
            </div>
          </div>
          {errors.profession && (
            <p className="text-red-500 text-sm">{errors.profession}</p>
          )}
        </div>

        {/* Area Field */}
        <div className="py-2 relative">
          <label
            htmlFor="area"
            className="font-semibold text-xl block text-[#344054] sm:py-2"
          >
            אזור המשרה
          </label>
          <div className="relative">
            <select
              id="area"
              className={`block appearance-none border w-full py-2 sm:py-4 px-3  pr-10 rounded-lg text-[#667085] text-right text-xl sm:text-2xl ${
                errors.area ? "border-red-500" : "border-[#D0D5DD]"
              }`}
              value={formData.area}
              onChange={handleChange}
            >
              <option value="">בחר אזור</option>
              {areas.map((item) => (
                <option key={item.area_id} value={item.area_id}>
                  {item.area_name}
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center px-2 text-gray-700">
              <FaAngleDown />
            </div>
          </div>
          {errors.area && <p className="text-red-500 text-sm">{errors.area}</p>}
        </div>

        {/* Location Field */}
        <div className="py-2 relative">
          <label
            htmlFor="location"
            className="font-semibold text-xl block text-[#344054] sm:py-2"
          >
            מיקום (לא חובה)
          </label>
          <div className="relative">
            <input
              className="block border border-[#D0D5DD] w-full py-2 sm:py-4 px-3  pr-14 rounded-lg text-[#667085] text-right text-xl sm:text-2xl"
              placeholder="תל אביב"
              id="location"
              type="text"
              value={formData.location}
              onChange={handleChange}
            />
            <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center pl-2.5 pr-2 text-gray-700">
              <FaMapMarkerAlt />
            </div>
          </div>
        </div>

        {/* Description Field */}
        <div className="py-2">
          <label
            htmlFor="description"
            className="font-semibold text-xl block text-[#344054] sm:py-2"
          >
            תיאור העבודה
          </label>
          <textarea
            className={`block border w-full py-2 sm:py-4 px-3 sm:px-2 rounded-lg text-[#667085] text-right text-xl sm:text-2xl overflow-y-scroll ${
              errors.description ? "border-red-500" : "border-[#D0D5DD]"
            }`}
            style={{ direction: 'rtl' }}
            placeholder="פרטי המשרה"
            id="description"
            value={formData.description}
            onChange={handleChange}
            rows={5}
          />
          {errors.description && (
            <p className="text-red-500 text-sm">{errors.description}</p>
          )}
        </div>

        {/* Email Field */}
        <div className="py-2 relative">
          <label
            htmlFor="email"
            className="font-semibold text-xl block text-[#344054] sm:py-2"
          >
            אימייל לשליחת קורות חיים
          </label>
          <input
            className={`block border w-full py-2 sm:py-4 px-3 sm:px-5 rounded-lg text-[#667085] text-right text-xl sm:text-2xl ${
              errors.email ? "border-red-500" : "border-[#D0D5DD]"
            }`}
            placeholder="email@example.com"
            id="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
          />
          {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
        </div>

        {/* WhatsApp Field */}
        <div className="py-2 relative">
          <label
            htmlFor="wa"
            className="font-semibold text-xl block text-[#344054] sm:py-2"
          >
            מספר וואטסאפ (לא חובה)
          </label>
          <div className="relative">
            <input
              className="block border w-full py-2 sm:py-4 px-2  pr-14 rounded-lg text-[#667085] text-right text-xl sm:text-2xl border-[#D0D5DD]"
              placeholder="הכנס מספר וואטסאפ"
              id="wa"
              type="text"
              value={formData.wa}
              onChange={handleChange}
            />
            <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center pl-2.5 pr-2 text-gray-700">
              <FaWhatsapp />
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="py-4">
          {loading ? (
            <div className="flex justify-center items-center">
              <Lottie
                loop
                animationData={loadingAnimation}
                className="w-24 h-24"
              />
            </div>
          ) : (
            <button
              type="submit"
              className={`w-full ${buttonClass} text-white py-3 px-5 rounded-lg text-2xl font-bold`}
            >
              פרסם
            </button>
          )}
        </div>

        {/* Status Messages */}
        {submitStatus === "success" && (
          <p className="text-green-500 text-center">המודעה פורסמה בהצלחה!</p>
        )}
        {submitStatus === "error" && (
          <p className="text-red-500 text-center">אירעה שגיאה בפרסום המודעה.</p>
        )}
      </form>
    </div>
  );
}
