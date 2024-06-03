import { memo, useState } from 'react';

const InputURL: React.FC = () => {
  const [url, setUrl] = useState<string>('https://stormik.vercel.app/search');

  return (
    <div className="wrapper-input-url">
      <input
        className="input-url"
        type="text"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            if (!url) {
              return;
            }

            let urlEnter = url;
            if (!/^.*?:\/\//.test(url)) {
              urlEnter = `https://${url}`;
            }
            window.electronAPI.enterUrl(urlEnter);
          }
        }}
      />
    </div>
  );
};

export default memo(InputURL);
