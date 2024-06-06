import { memo, useState } from 'react';

const InputURL: React.FC = () => {
  const [url, setUrl] = useState<string>('');

  // useEffect(() => {
  //   window.electronAPI.detectUrlChange((data: string) => {
  //     console.log('ducnh1234', data);

  //     setUrl(data);
  //   });

  //   // window.electronAPI.receive('url-change', (data: string) => {
  //   //   console.log(`Received ${data} from main process`);
  //   // });

  //   // window.addEventListener(
  //   //   'message',
  //   //   (event) => {
  //   //     console.log('ducnh e', event.data);
  //   //   },
  //   //   false
  //   // );
  // }, []);

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

      <p className="icon-bookmark">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z"
          />
        </svg>
      </p>
    </div>
  );
};

export default memo(InputURL);
