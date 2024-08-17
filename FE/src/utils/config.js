import toast from "react-hot-toast";
import { HomeIcon } from "../assets/icon/HomeIcon";
import { ResourcesIcon } from "../assets/icon/ResourcesIcon";
import { SettingsIcon } from "../assets/icon/SettingsIcon";
import axios from "axios";
import {
  deleteAppointment,
  getAppointmentsListPatientId,
} from "../services/api";

export const userSidebarItems = [
  {
    id: 1,
    title: "Dashboard",
    icon: HomeIcon,
    path: "/dashboard",
  },
  {
    id: 2,
    title: "Bookings",
    icon: ResourcesIcon,
    path: "/dashboard/appointments",
  },
  {
    id: 3,
    title: "History",
    icon: ResourcesIcon,
    path: "/dashboard/medical-history",
  },
  {
    id: 4,
    title: "Settings",
    icon: SettingsIcon,
    path: "/dashboard/settings",
  },
];

export const doctorSidebarItems = [
  {
    id: 1,
    title: "Dashboard",
    icon: HomeIcon,
    path: "/dashboard",
  },
  {
    id: 2,
    title: "Schedule",
    icon: ResourcesIcon,
    path: "/dashboard/schedule",
  },
  {
    id: 3,
    title: "Settings",
    icon: SettingsIcon,
    path: "/dashboard/settings",
  },
];

export const sanitizeInput = (value) => {
  // Handle null or undefined values
  if (value == null) return ""; // Return an empty string for null or undefined values

  // Ensure the input is treated as a string
  const str = String(value);

  // Function to escape special characters
  const escapeHTML = (str) => {
    return str
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;")
      .replace(/`/g, "&#x60;") // Escape backticks
      .replace(/\//g, "&#x2F;") // Escape forward slashes
      .replace(/=/g, "&#x3D;"); // Escape equals sign
  };

  // Regular expression to detect potentially malicious content
  const maliciousPatterns =
    /<script.*?>.*?<\/script.*?>|<.*?on\w+.*?=.*?>|javascript:|<iframe.*?>.*?<\/iframe.*?>|<object.*?>.*?<\/object.*?>/gi;
  const containsMaliciousContent = maliciousPatterns.test(str);

  if (containsMaliciousContent) {
    console.log("Input contains potentially malicious content:", str);
  }

  // Escape the input
  const escapedValue = escapeHTML(str);

  // Additional sanitization checks can be added here if needed

  return escapedValue; // Return the sanitized input
};

// Example usage:
// const userInput1 = <div onclick="alert('XSS Attack!')">Click me</div>

// const userInput2 = '<fem>Safe content</fem>';
// const sanitizedInput1 = sanitizeInput(userInput1);
// const sanitizedInput2 = sanitizeInput(userInput2);
// console.log(sanitizedInput1); // &lt;script&gt;alert(&quot;XSS Attack!&quot;)&lt;&#x2F;script&gt;
// console.log(sanitizedInput2); // &lt;fem&gt;Safe content&lt;&#x2F;fem&gt;

export const getCsrfToken = async () => {
  try {
    const response = await axios.get("/csrf-token");
    return response.data.csrfToken;
  } catch (error) {
    console.log("Error fetching CSRF token:", error);
    return null;
  }
};

export async function getSession() {
  try {
    const response = await axios.get("http://localhost:5500/protected-route");
    console.log(response, "ada favour");
    if (!response.ok) {
      toast(
        "Session timed out. redirecting to login lage ",
        "error",
        "http://localhost:5500/signin"
      );
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.log("Error during fetching protected route:", error);
    // Handle the error appropriately, e.g., show an error message to the user
  }
}

export const GetTime = (setTimeSlot) => {
  const timeList = [];
  for (let i = 10; i <= 12; i++) {
    timeList.push({
      time: i + ":00 AM",
    });
    timeList.push({
      time: i + ":30 AM",
    });
  }
  for (let i = 1; i <= 6; i++) {
    timeList.push({
      time: i + ":00 PM",
    });
    timeList.push({
      time: i + ":30 PM",
    });
  }
  setTimeSlot(timeList);
};

export const handleDeleteAppointment = async (
  appointmentId,
  userId,
  setEventList
) => {
  try {
    const response = await deleteAppointment(
      appointmentId,
      userId,
      setEventList
    );
    console.log(response);
    if (response?.status === 200) {
      toast.success(response?.data?.message);
      // window.location.reload();
      const responseList = await getAppointmentsListPatientId(userId);
      if (responseList?.status === 200) {
        setEventList(responseList?.data?.data);
      }
    }
  } catch (error) {
    console.log(error);
  }
};
