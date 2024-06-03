import { memo, useEffect, useState } from 'react';

const InputURL: React.FC = () => {
  const [url, setUrl] = useState<string>('');

  useEffect(() => {
    window.electronAPI.detectUrlChange((data: string) => setUrl(data));

    window.electronAPI.receive('url-change', (data: string) => {
      console.log(`Received ${data} from main process`);
    });
  }, []);

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

            if (
              url.match(
                /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&=]*)/g
              )
            ) {
              if (!/^.*?:\/\//.test(url)) {
                window.electronAPI.enterUrl(`https://${url}`);
                return;
              }
              window.electronAPI.enterUrl(url);
              return;
            }
            window.electronAPI.enterUrl(`https://stormik.vercel.app/search?query=${url}`);
          }
        }}
      />
    </div>
  );
};

export default memo(InputURL);
