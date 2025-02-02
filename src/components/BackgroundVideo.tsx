import React from "react";

const videos = [
  'jTQ0gbh.mp4',
  'davQLBo.mp4',
  'doJRA0o.mp4',
  '4MXcEuf.mp4',
  'NzKeyiF.mp4',
  'A46xD3Q.mp4',
  'IZDzEBK.mp4',
  'YsRzL3G.mp4',
  'PJBO5VI.mp4',
  'njPhhkc.mp4',
  '6dCgyuo.mp4',
  'z2AvXVG.mp4',
  'KZwLV4q.mp4',
  'mbCpvZD.mp4',
  'FUiXiUm.mp4',
  'VgyviMt.mp4',
  'demDJGv.mp4',
  'VoBp08Q.mp4',
  'Jbm6lgm.mp4',
  'wUNsNFR.mp4',
  'zokplyL.mp4',
  'JYQiziW.mp4',
  'jxoPOUx.mp4',
  'szTQ7dL.mp4',
  'klSRmXk.mp4',
  'E4nU7qj.mp4',
  'VlRvQl8.mp4',
  'wA908AV.mp4',
  'TYttEQo.mp4',
  'LRzylLj.mp4',
  'bMq9APc.mp4',
  'bsdz2KK.mp4',
  '9DMQ7ae.mp4',
  '3yEmUFm.mp4',
  'nYuVFMI.mp4',
  'iagYykI.mp4',
  'l6Xgvsw.mp4',
  'NW0mK39.mp4',
  'v745rRo.mp4',
  'UvOtdLp.mp4',
  'KSnHY7G.mp4',
  'MfM8hEp.mp4',
  'jlYFK9M.mp4',
  '9SA7eYu.mp4',
  'gkKviRB.mp4',
  'vyf4HMz.mp4',
  'zb3BZCv.mp4',
  'OkLajvJ.mp4',
  'NYFd64r.mp4',
  'nIfIO7B.mp4',
  'vIcTXLB.mp4',
  '297G0Yv.mp4',
  'nchNwU3.mp4',
  'fpLeJ72.mp4',
  'dgxOC3t.mp4',
  'fGhMmCL.mp4',
  'HfCURPU.mp4',
  'ef2dwkL.mp4',
  'gFJuRrl.mp4',
  'mc1SHbe.mp4',
  'Evb2Bp4.mp4',
  'CK3nE4D.mp4',
  'Jq4KaUG.mp4',
  '6TEKENJ.mp4',
  'NAPUn0w.mp4',
  'Bb5NN1w.mp4',
  'nHwQ9OT.mp4',
  'VYuxVse.mp4',
  '6uecfLq.mp4',
  'ISBUJSa.mp4',
  '4003cn5.mp4',
  'DJquD23.mp4',
  '1Ccd5n0.mp4',
  'XwFBDKm.mp4',
  '3XOka2Q.mp4',
  'QOQpPVE.mp4',
  'xObqCPy.mp4',
  '2wuFCho.mp4',
  'JstVZOW.mp4',
  'DBUrN4R.mp4',
  '4FCpx4v.mp4',
  'aTCokPU.mp4',
  'uM4SUXw.mp4',
  'VIZgdxy.mp4',
  'plr4DLd.mp4',
  'oUMTTo6.mp4',
  'soizCaY.mp4',
  'MHWLac7.mp4',
  'DYdqBOQ.mp4',
  'vvTgHde.mp4',
  'zW8idqj.mp4',
  '3N0WPfx.mp4',
  'mnRN5O4.mp4',
  'PoykWUB.mp4',
  '5zYBvoG.mp4',
  'ew96NXw.mp4',
  'zHwm2Hd.mp4',
  'M4xObqC.mp4',
  'OACf5cL.mp4',
  'crVIR49.mp4',
  'xZVyi5Y.mp4',
  'eET8MpF.mp4',
  'tjVOWZY.mp4',
  'emBDw7S.mp4',
  'DO2WA2J.mp4',
  'vnkglbw.mp4',
  'igo4KsE.mp4',
  'TH2b3rL.mp4',
  'TaNTKki.mp4',
  'zwKZz3E.mp4',
  'OtcZb45.mp4',
  'GLGo5yp.mp4',
  'rGqnZJ0.mp4',
  'yMLAGVx.mp4',
  'XQiErrk.mp4',
  'WUTwNk9.mp4',
  '6VFWhnV.mp4',
  'jcYekhr.mp4',
  '0cvffgS.mp4',
  'e2T6sC4.mp4',
  'ZvU6f2D.mp4',
  'tQie8G2.mp4',
  'VNfw0A4.mp4',
  '7OVOjLj.mp4',
  '1KPE3pG.mp4',
];

export const getRandomVideo = () => {
  const video = videos[Math.floor(Math.random() * videos.length)];

  return `/backgrounds/${video}`;
};

type BackgroundVideoProps = {
  videoURL: string;
};

export const BackgroundVideo: React.FC<BackgroundVideoProps> = ({ videoURL }) => {
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    setLoading(true);

    const timeout = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => {
      clearTimeout(timeout);
    }
  }, [videoURL])

  return (
    <video
      className={`z-10 fixed right-0 left-0 transition-opacity w-full h-full object-cover ${loading ? 'opacity-0' : 'opacity-100'}`}
      autoPlay
      loop
      muted
      src={videoURL}
    />
  )
}