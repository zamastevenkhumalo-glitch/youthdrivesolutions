// Geometric redraws checked against the supplied Code 10 guide, PDF pages 3–4.
// These are teaching illustrations, not engineering drawings for manufacturing signs.
export const roadSigns = [
  {id:'stop',name:'Stop',family:'Regulatory',page:4,meaning:'Come to a complete stop; proceed only when safe.'},
  {id:'yield',name:'Yield',family:'Regulatory',page:4,meaning:'Give way to traffic with priority.'},
  {id:'no-entry',name:'No entry',family:'Regulatory',page:4,meaning:'Do not enter this road from this direction.'},
  {id:'one-way-left',name:'One way — left',family:'Regulatory',page:3,meaning:'The one-way direction is to the left.'},
  {id:'oncoming',name:'Yield to oncoming traffic',family:'Regulatory',page:4,meaning:'Give priority to approaching traffic from the opposite direction.'},
  {id:'height',name:'Maximum height',family:'Regulatory',page:4,meaning:'The illustrated height restriction is 4.42 metres.'},
  {id:'mass',name:'Maximum weight',family:'Regulatory',page:4,meaning:'The illustrated weight restriction is 12 tonnes.'},
  {id:'crossroads',name:'Crossroads ahead',family:'Warning',page:3,meaning:'An intersection with roads crossing lies ahead.'},
  {id:'roundabout',name:'Traffic circle ahead',family:'Warning',page:3,meaning:'A traffic circle lies ahead.'},
  {id:'dual-start',name:'Beginning of dual road',family:'Warning',page:3,meaning:'A dual road begins ahead.'},
  {id:'dual-end',name:'End of dual road',family:'Warning',page:3,meaning:'The dual road ends ahead.'},
  {id:'curve-right',name:'Gentle curve to the right',family:'Warning',page:3,meaning:'The road curves gently to the right ahead.'},
  {id:'sharp-right',name:'Sharp curve to the right',family:'Warning',page:3,meaning:'A sharp right-hand curve lies ahead.'},
  {id:'staggered',name:'Staggered junction ahead',family:'Warning',page:3,meaning:'The side roads join at different positions ahead.'},
];
const red='#ce2028', black='#111820';
function Arrow({x=0,y=0,rotate=0,colour=black}) {return <path d="M -8 26 V -9 H -20 L 0 -31 L 20 -9 H 8 V 26 Z" fill={colour} transform={`translate(${x} ${y}) rotate(${rotate})`}/>;}
export default function RoadSign({id,quiz=false}) {
  const sign=roadSigns.find(s=>s.id===id);
  if(!sign)return <span>Sign illustration unavailable</span>;
  let drawing;
  if(sign.family==='Warning') {
    const symbol = id==='crossroads'?<path d="M75 67V132M48 98H102" stroke={black} strokeWidth="13"/>:
      id==='roundabout'?<g>{[0,120,240].map(angle=><g key={angle} transform={`rotate(${angle} 75 105)`}><path d="M56 88 Q78 71 95 96" fill="none" stroke={black} strokeWidth="8"/><path d="M86 93L101 91L98 106Z" fill={black}/></g>)}</g>:
      id==='curve-right'?<path d="M67 133V110Q67 88 88 88H97M85 75L99 88L85 101" fill="none" stroke={black} strokeWidth="11" strokeLinejoin="miter"/>:
      id==='sharp-right'?<path d="M63 133V94H99M86 80L100 94L86 108" fill="none" stroke={black} strokeWidth="11" strokeLinejoin="miter"/>:
      id==='staggered'?<path d="M75 67V132M48 89H75M75 113H101" fill="none" stroke={black} strokeWidth="12"/>:
      <g transform={id==='dual-end'?'translate(0 200) scale(1 -1)':''}><path d="M66 134V68M66 120Q96 112 96 94V68" fill="none" stroke={black} strokeWidth="11"/><path d="M79 75V100" stroke={black} strokeWidth="4"/></g>;
    drawing=<><path d="M75 8L145 140H5Z" fill={red} stroke={red} strokeWidth="3" strokeLinejoin="round"/><path d="M75 33L128 130H22Z" fill="white"/><g transform="translate(13.5 18) scale(.82)">{symbol}</g></>;
  } else if(id==='stop') drawing=<><path d="M44 6H106L144 44V106L106 144H44L6 106V44Z" fill={red} stroke="white" strokeWidth="3"/><path d="M45 11H105L139 45V105L105 139H45L11 105V45Z" fill="none" stroke="white" strokeWidth="2"/><text x="75" y="91" fill="white" textAnchor="middle" fontFamily="Arial Narrow,Arial,sans-serif" fontSize="40" fontWeight="800" textLength="110" lengthAdjust="spacingAndGlyphs">STOP</text></>;
  else if(id==='yield') drawing=<><path d="M7 10H143L75 142Z" fill={red} stroke={red} strokeWidth="3" strokeLinejoin="round"/><path d="M31 25H119L75 112Z" fill="white"/></>;
  else if(id==='one-way-left') drawing=<><rect x="5" y="18" width="140" height="114" rx="2" fill={red} stroke="white" strokeWidth="3"/><path d="M17 75L61 36V59H132V91H61V114Z" fill="white"/></>;
  else drawing=<><circle cx="75" cy="75" r="67" fill={id==='no-entry'?red:'white'} stroke={red} strokeWidth="10"/>{id==='no-entry'?<path d="M29 61H121V89H29Z" fill="white"/>:id==='oncoming'?<><Arrow x={51} y={66} colour={red}/><Arrow x={99} y={82} rotate={180}/></>:id==='height'?<><path d="M61 28H89L75 50ZM61 122H89L75 100Z" fill={black}/><text x="75" y="87" textAnchor="middle" fontFamily="Arial,sans-serif" fontWeight="700" fontSize="34">4,42</text></>:<text x="75" y="93" textAnchor="middle" fontFamily="Arial,sans-serif" fontWeight="700" fontSize="48">12t</text>}</>;
  return <svg className="sa-road-sign" viewBox="0 0 150 150" role="img" aria-label={quiz?'Road sign for this question':sign.name}>{drawing}</svg>;
}
