import React from "react";
import { useSelector, useDispatch } from "react-redux";
import "./FileList.css";
import { selectFile } from "../../redux/fileManagementSlice";

function FileList() {
  const files = useSelector((state) => state.fileManagement.files);
  const selectedFile = useSelector(
    (state) => state.fileManagement.selectedFile
  );
  const dispatch = useDispatch();

  const handleSelect = (file) => {
    dispatch(selectFile(file));
  };

  return (
    <div>
      <ul className="fileList">
        {files?.map((file, index) => (
          <li
            key={index}
            className={`fileItem ${selectedFile === file ? "selected" : ""}`}
            onClick={() => handleSelect(file)}
          >
            {file}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default FileList;
