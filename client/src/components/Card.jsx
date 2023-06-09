import React, { useState } from 'react';
import { download } from '../assets';
import { downloadImage } from '../utils';
import AudioPlayer from './AudioPlayer';

const Card = ({
  _id,
  name,
  prompt,
  promptFR,
  linkAudio,
  linkImg,
  number,
}) => {
  const [info, setInfo] = useState(false);

  return (
    <div className="rounded-xl group relative  ">
      <div>
        <img
          className="w-[100%] h-[400px] object-cover rounded-t-md cursor-pointer"
          src={linkImg}
          alt={prompt}
          onClick={() => setInfo(!info)}
        />
        <div className="  text-black rounded-md absolute top-[20px] right-[20px]">
          <AudioPlayer
            src={linkAudio ? linkAudio : '1.mp3'}
            info={info}
          />
        </div>
        <div className="w-auto h-auto rounded-[5px] p-[8px] object-cover bg-[#10131f] flex justify-center items-center text-white text-[16px] absolute top-[20px] left-[20px] ">
          {number}
          {/* {name[0]} */}
        </div>
      </div>

      {info && (
        <div className="group-hover:flex flex-col max-h-[94.5%] bottom-0 left-0 right-0 bg-[#10131f] mt-1  p-4 rounded-md">
          <p className="text-[#FCFF42] text-[16px] overflow-y-auto prompt pb-[10px]">
            {prompt}
          </p>
          <p className="text-white text-[16px] overflow-y-auto prompt  ">
            {promptFR}
          </p>

          {/* <div className="mt-5 flex justify-between items-center gap-2">
            <div className="flex items-center gap-2">
              <div className="w-auto h-auto rounded-[5px] p-[8px] object-cover bg-[#10e1e5] flex justify-center items-center text-black text-[12px] font-bold">
                {number}
                {name[0]}
              </div>
            </div>

            <div className="flex ">
              <button
                type="button"
                onClick={() => downloadImage(_id, photo)}
                className="outline-none bg-transparent border-none"
              >
                <img
                  src={download}
                  alt="download"
                  className="w-8 h-8 object-contain invert"
                />
              </button>
            </div>
          </div> */}
        </div>
      )}
    </div>
  );
};

export default Card;
