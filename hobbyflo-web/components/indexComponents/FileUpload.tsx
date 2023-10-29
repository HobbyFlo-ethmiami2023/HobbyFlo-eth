import * as React from 'react';
import {useState}  from 'react';

const crypto = require('crypto');

/*TODO: Consider whether hashing is best 
done in the frontend component, the controller,
then stored in Postgres. Alternatively, users
create hashes with a third party solution*/

interface FileUploadProps {
  onHashChange: (hash: string) => void;
}

const FileUpload: React.FC<FileUploadProps> = ({ onHashChange }) => {
  const [file, setFile] = useState<File>();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (file) {
      setFile(file);

      //Return hash of file
      const reader = new FileReader();
      reader.onload = function() {
        const fileContents = reader.result;

        const hash = crypto.createHash('sha256').update(fileContents).digest('hex');

        //Updating hash for state
        onHashChange(hash);
      };

      reader.readAsArrayBuffer(file);
    }
  };

  return (
    <form>
      <input type="file" onChange={handleFileChange} />
      <input type="submit" value="Upload" />
    </form>
  );
};


export default FileUpload;
 useState;

