import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { debounce } from "lodash";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const MarkDown = () => {
    const [markDown, setMarkDown] = useState("");
    const [html, setHtml] = useState("");

    const showErrorToast = (message) => {
        toast.error(message, {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            icon: "❌",
        });
    };

    const processMarkdown = useCallback(
        debounce(async (markdown) => {
            if (!markdown.trim()) {
                setHtml("");
                return;
            }
            try {
                const response = await axios.post(`http://localhost:8888/convert`, {
                    markdown,
                });

                if (response.status === 200) {
                    setHtml(response.data.html);
                } else {
                    showErrorToast("Error processing Markdown");
                }
            } catch (error) {
                showErrorToast("Error processing Markdown");
            }
        }, 300),
        []
    );

    useEffect(() => {
        processMarkdown(markDown);
    }, [markDown, processMarkdown]);

    return (
        <div className="center-div">
            <textarea
                className="left-side"
                value={markDown}
                onChange={(e) => setMarkDown(e.target.value)}
                placeholder="Enter Markdown here..."
            ></textarea>
            <div className="right-side" dangerouslySetInnerHTML={{ __html: html }}></div>
            <ToastContainer />
        </div>
    );
};

export default MarkDown;
