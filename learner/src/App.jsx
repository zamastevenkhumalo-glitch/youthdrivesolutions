import { useEffect, useMemo, useState } from 'react';
import { LayoutDashboard, BookOpen, ClipboardCheck, CarFront, ChartNoAxesCombined, ArrowRight, ArrowLeft, CheckCircle2, ShieldCheck, RefreshCcw, Menu, X, ChevronRight, ExternalLink, Info, Target, Clock3, Trophy, Check, Circle } from 'lucide-react';
import { topics, questions, scenarios } from './content';
import RoadSign, { roadSigns } from './RoadSign';
import youthdriveLogo from '../../logo.jpg';

const STORE = 'youthdrive_k53_local_progress_v1';
const blank = {studied:[], attempts:[]};
const INITIAL = () => {try {const v=JSON.parse(localStorage.getItem(STORE));return {studied:Array.isArray(v?.studied)?v.studied.filter(x=>topics.some(t=>t.id===x)):[],attempts:Array.isArray(v?.attempts)?v.attempts.slice(-100):[]};}catch{return blank;}};
const PUBLIC_SITE = import.meta.env.VITE_PUBLIC_SITE_URL || (import.meta.env.DEV ? 'http://localhost:5173/' : '/');
const nav=[['home','Overview',LayoutDashboard],['study','Learn K53',BookOpen],['quiz','Practice tests',ClipboardCheck],['road','Road situations',CarFront],['progress','My progress',ChartNoAxesCombined]];

function Metric({icon:Icon,label,value,sub}) {return <div className="metric"><span className="metric-icon"><Icon size={21}/></span><div><span>{label}</span><strong>{value}</strong><small>{sub}</small></div></div>}
function ScreenTitle({tag,title,children}){return <div className="screen-heading"><p className="eyebrow">{tag}</p><h1>{title}</h1>{children&&<p>{children}</p>}</div>}

export default function App(){
  const [tab,setTab]=useState('home');
  const [menuOpen,setMenuOpen]=useState(false);
  const [progress,setProgress]=useState(INITIAL);
  const [topicId,setTopicId]=useState('signs');
  const [test,setTest]=useState(null);
  const [questionIndex,setQuestionIndex]=useState(0);
  const [answers,setAnswers]=useState({});
  const [finished,setFinished]=useState(null);
  const [scenarioIndex,setScenarioIndex]=useState(0);
  const [scenarioChoice,setScenarioChoice]=useState(null);

  useEffect(()=>{try{localStorage.setItem(STORE,JSON.stringify(progress));}catch{/* Private browsing can block local storage. */}},[progress]);
  const attempts=progress.attempts;
  const totalTests=attempts.length;
  const average=totalTests?Math.round(100*attempts.reduce((s,a)=>s+a.score/a.total,0)/totalTests):0;
  const best=totalTests?Math.max(...attempts.map(a=>Math.round(a.score/a.total*100))):0;
  const topic=topics.find(t=>t.id===topicId) || topics[0];
  const recent=attempts.slice(-5).reverse();

  function navigate(to){setTab(to);setMenuOpen(false);window.scrollTo({top:0,behavior:'smooth'});}
  function markStudied(id){setProgress(p=>({...p,studied:p.studied.includes(id)?p.studied:[...p.studied,id]}));}
  function startTest(which){const pool=which==='all'?questions:questions.filter(q=>q.topic===which);
    const selected=which==='all'?[...pool].sort(()=>Math.random()-.5).slice(0,10):pool;
    setTest({topic:which,questions:selected});setAnswers({});setQuestionIndex(0);setFinished(null);navigate('quiz');}
  function chooseAnswer(value){if(answers[questionIndex]!==undefined)return;setAnswers(a=>({...a,[questionIndex]:value}));}
  function advance(){if(!test)return;
    if(questionIndex < test.questions.length-1){setQuestionIndex(i=>i+1);return;}
    const score=test.questions.reduce((sum,q,i)=>sum+(answers[i]===q.correct?1:0),0);
    const result={id:Date.now(),date:new Date().toISOString(),topic:test.topic,score,total:test.questions.length};
    setProgress(p=>({...p,attempts:[...p.attempts,result].slice(-100)}));setFinished(result);setTest(null);
  }
  function reset(){if(window.confirm('Clear study completion and practice results saved on this device?'))setProgress({studied:[],attempts:[]});}
  const quizQuestion=test?.questions[questionIndex];
  const thisAnswer=answers[questionIndex];
  const coverage=Math.round(progress.studied.length/topics.length*100);
  const grouped=useMemo(()=>topics.map(t=>({name:t.name,rows:attempts.filter(a=>a.topic===t.id),id:t.id})),[attempts]);

  return <div className="app-shell">
    <button className="mobile-menu-button" onClick={()=>setMenuOpen(v=>!v)} aria-label="Toggle navigation" aria-expanded={menuOpen}>{menuOpen?<X size={22}/>:<Menu size={22}/>}</button>
    <aside className={`sidebar ${menuOpen?'is-open':''}`}>
      <a className="brand" href={PUBLIC_SITE} aria-label="YouthDrive Solutions main website"><img src={youthdriveLogo} alt="YouthDrive Solutions"/><span>LEARNER PORTAL</span></a>
      <div className="sidebar-label">YOUR LEARNING</div><nav aria-label="Learner portal navigation">{nav.map(([id,label,Icon])=><button type="button" key={id} className={`nav-link ${tab===id?'active':''}`} onClick={()=>navigate(id)}><Icon size={19}/><span>{label}</span>{tab===id&&<span className="nav-active-dot"/>}</button>)}</nav>
      <div className="sidebar-bottom"><div className="sidebar-help"><ShieldCheck size={21}/><div><strong>Learn at your pace</strong><p>Study and review whenever you have time.</p></div></div><a href={PUBLIC_SITE} className="return-link"><ArrowLeft size={17}/> YouthDrive website</a></div>
    </aside>
    {menuOpen&&<button className="mobile-shade" onClick={()=>setMenuOpen(false)} aria-label="Close navigation"/>}
    <div className="workspace"><header className="topbar"><div><span className="top-crumb">YouthDrive / </span><strong>{nav.find(x=>x[0]===tab)?.[1]}</strong></div><span className="topbar-pill"><span className="topbar-dot"/> K53 Learning Hub</span></header>
      <main className="content">
        {tab==='home'&&<><div className="welcome"><div><p className="eyebrow">WELCOME TO YOUTHDRIVE</p><h1>Your road to <em>confidence.</em></h1><p>Explore K53 topics, practise questions and see your progress as you learn.</p><button className="primary-btn" onClick={()=>navigate('study')}>Continue learning <ArrowRight size={19}/></button></div><div className="welcome-visual"><span className="welcome-circle"><CarFront size={78} strokeWidth={1.15}/></span><span className="welcome-caption">LEARN · PRACTISE · PROGRESS</span></div></div>
        <div className="metrics"><Metric icon={BookOpen} label="Topics studied" value={`${progress.studied.length} / ${topics.length}`} sub="Learning sections"/><Metric icon={ClipboardCheck} label="Tests completed" value={totalTests} sub="Practice sessions"/><Metric icon={Target} label="Average score" value={`${average}%`} sub="Across saved tests"/><Metric icon={Trophy} label="Best result" value={`${best}%`} sub="Your highest score"/></div>
        <div className="section-title"><div><p className="eyebrow">START HERE</p><h2>Learn from our K53 and Code 10 study guides</h2></div><button className="text-action" onClick={()=>navigate('study')}>All topics <ArrowRight size={17}/></button></div>
        <div className="topic-grid">{topics.map(t=><button key={t.id} className="topic-card" onClick={()=>{setTopicId(t.id);navigate('study')}}><span className="topic-symbol">{t.emoji}</span><span className="topic-index">{t.count} / {String(topics.length).padStart(2,'0')}</span><h3>{t.name}</h3><p>{t.short}</p><span className="topic-bottom">{progress.studied.includes(t.id)?'Reviewed':'Explore topic'} <ArrowRight size={17}/></span></button>)}</div>
        <div className="quick-practice"><div className="quick-icon"><ClipboardCheck size={28}/></div><div><strong>Ready to test your knowledge?</strong><p>Try a 10-question mixed practice test.</p></div><button className="secondary-btn" onClick={()=>startTest('all')}>Start practice <ArrowRight size={17}/></button></div></>}

        {tab==='study'&&<><ScreenTitle tag="LEARN K53" title="Build your K53 knowledge">Choose a topic and work through each key concept before attempting a practice test.</ScreenTitle>
        <div className="study-layout"><div className="study-sidebar">{topics.map(t=><button className={`study-topic ${topicId===t.id?'chosen':''}`} key={t.id} onClick={()=>setTopicId(t.id)}><span className="study-symbol">{t.emoji}</span><span><strong>{t.name}</strong><small>{t.short}</small></span>{progress.studied.includes(t.id)&&<CheckCircle2 size={19} className="green"/>}</button>)}</div>
          <div className="study-content"><div className="study-header"><p className="eyebrow">LEARNING MODULE {topic.count}</p><h2>{topic.name}</h2><p>{topic.overview}</p></div><div className="lesson-list">{topic.lessons.map((lesson,i)=><article className="lesson" key={lesson.title}><span className="lesson-index">{String(i+1).padStart(2,'0')}</span><div><h3>{lesson.title}</h3><p>{lesson.body}</p>{lesson.source&&<small className="lesson-source">Study reference: {lesson.source}</small>}</div></article>)}</div>
          <section className="sign-study" hidden={topicId!=='signs'} aria-label="Road-sign families"><h3>Recognise the family. Read the sign.</h3><p>Compare the shape and symbol, then learn what the sign tells you.</p>{['Warning','Regulatory','Guide / information'].map(family=><section key={family} className="sign-family"><h3>{family}</h3><p>{family==='Warning'?'These signs alert you to road conditions ahead. Identify the hazard and prepare for it.':family==='Regulatory'?'These signs give requirements, prohibitions and restrictions. Read the instruction and any limit shown.':'These signs provide directions, distances and information. The guide groups direction signs as green, freeway signs as blue, tourism signs as brown and temporary signs as yellow.'}</p>{family==='Guide / information'?<p className="sign-coverage">Individual guide-sign examples are not included in this selection.</p>:<div className="sign-grid">{roadSigns.filter(s=>s.family===family).map(sign=><article className="sign-card" key={sign.id}><RoadSign id={sign.id}/><h4>{sign.name}</h4><p>{sign.meaning}</p><small className="lesson-source">Code 10 guide · PDF page {sign.page} (printed page {sign.page-1})</small></article>)}</div>}</section>)}<p className="sign-coverage">Selected signs from the Code 10 guide, PDF pages 3–4. This is not a complete sign catalogue.</p></section><div className="study-actions"><button className="primary-btn" onClick={()=>{markStudied(topicId);startTest(topicId)}}>Practise this topic <ArrowRight size={18}/></button>{!progress.studied.includes(topicId)&&<button className="outline-btn" onClick={()=>markStudied(topicId)}><Check size={17}/> Mark studied</button>}</div></div></div></>}

        {tab==='quiz'&&<><ScreenTitle tag="K53 PRACTICE" title={test?'Practice in progress':finished?'Your practice result':'Test your understanding'}>Use practice tests to reinforce what you've studied and identify topics to revisit.</ScreenTitle>
        {!test&&!finished&&<><div className="test-choices"><button className="test-choice featured" onClick={()=>startTest('all')}><span><ClipboardCheck size={25}/></span><small>MIXED TOPICS</small><h2>Quick practice</h2><p>Ten mixed questions drawn from the study topics, including heavy vehicles.</p><strong>Begin test <ArrowRight size={18}/></strong></button>{topics.map(t=><button className="test-choice" onClick={()=>startTest(t.id)} key={t.id}><span><BookOpen size={23}/></span><small>TOPIC PRACTICE</small><h2>{t.name}</h2><p>{questions.filter(q=>q.topic===t.id).length} questions on this subject.</p><strong>Start questions <ArrowRight size={18}/></strong></button>)}</div>
        <div className="tip"><Info size={19}/><p>Practise by topic or try a mixed test. Review the explanation after each answer.</p></div></>}
        {test&&quizQuestion&&<div className="question-panel"><div className="question-progress"><span>QUESTION {questionIndex+1} OF {test.questions.length}</span><span>{Math.round((questionIndex+1)/test.questions.length*100)}%</span></div><div className="progress-track"><span style={{width:`${(questionIndex+1)/test.questions.length*100}%`}}/></div><span className="question-topic">{topics.find(x=>x.id===quizQuestion.topic)?.name}</span><div className={`question-with-sign ${quizQuestion.sign?'has-sign':''}`}><h2>{quizQuestion.q}</h2>{quizQuestion.sign&&<RoadSign id={quizQuestion.sign} quiz/>}</div><div className="answers">{quizQuestion.answers.map((item,i)=>{const selected=thisAnswer===i,submitted=thisAnswer!==undefined,correct=quizQuestion.correct===i;return <button type="button" disabled={submitted} key={item} className={`answer ${selected?'selected':''} ${submitted&&correct?'correct':''} ${submitted&&selected&&!correct?'incorrect':''}`} onClick={()=>chooseAnswer(i)}><span className="answer-letter">{String.fromCharCode(65+i)}</span><span>{item}</span>{submitted&&correct&&<CheckCircle2 size={20}/>}</button>})}</div>
          {thisAnswer!==undefined&&<div className="feedback"><strong>{thisAnswer===quizQuestion.correct?'Correct answer!':'Review this answer'}</strong><p>{quizQuestion.reason}</p>{quizQuestion.source&&<small className="lesson-source">Study reference: {quizQuestion.source}</small>}</div>}
          <div className="question-actions"><button className="text-action" onClick={()=>{setTest(null);setAnswers({});setFinished(null)}}>Exit test</button><button className="primary-btn" disabled={thisAnswer===undefined} onClick={advance}>{questionIndex===test.questions.length-1?'Finish test':'Next question'} <ArrowRight size={17}/></button></div></div>}
        {finished&&!test&&<div className="result-card"><div className="result-ring"><span>{Math.round(finished.score/finished.total*100)}%</span></div><p className="eyebrow">SESSION COMPLETE</p><h2>{finished.score} correct out of {finished.total}</h2><p>Keep practising and review topics where you need more confidence.</p><div className="result-actions"><button className="primary-btn" onClick={()=>startTest(finished.topic)}>Try another test <RefreshCcw size={17}/></button><button className="outline-btn" onClick={()=>{setFinished(null);navigate('progress')}}>View progress <ChartNoAxesCombined size={17}/></button></div></div>}</>}

        {tab==='road'&&<><ScreenTitle tag="ROAD SITUATIONS" title="Think before you move">Explore common driving situations and decide on a safe response.</ScreenTitle><div className="situation-layout"><div className="situation-scene" aria-hidden="true"><div className="road-scene"><div className="road-edges"/><div className="lane-markings"/><span className="road-car">🚗</span></div><span>OBSERVE · DECIDE · RESPOND</span></div>
        <div className="situation-card"><div className="question-progress"><span>SCENARIO {scenarioIndex+1} OF {scenarios.length}</span></div><h2>{scenarios[scenarioIndex].title}</h2><p>{scenarios[scenarioIndex].text}</p><div className="answers">{scenarios[scenarioIndex].choices.map((item,i)=><button key={item} disabled={scenarioChoice!==null} className={`answer ${scenarioChoice===i?'selected':''} ${scenarioChoice!==null&&i===scenarios[scenarioIndex].correct?'correct':''}`} onClick={()=>setScenarioChoice(i)}><span className="answer-letter">{String.fromCharCode(65+i)}</span>{item}</button>)}</div>
        {scenarioChoice!==null&&<div className="feedback"><strong>{scenarioChoice===scenarios[scenarioIndex].correct?'Good decision':'Consider this safer choice'}</strong><p>{scenarios[scenarioIndex].explain}</p></div>}
        <div className="question-actions"><span className="scenario-note">Observe · decide · respond</span><button disabled={scenarioChoice===null} className="primary-btn" onClick={()=>{setScenarioIndex(i=>(i+1)%scenarios.length);setScenarioChoice(null)}}>Next situation <ArrowRight size={17}/></button></div></div></div></>}

        {tab==='progress'&&<><ScreenTitle tag="LEARNING PROGRESS" title="Your learning, at a glance">Review your practice history and see which topics you've covered.</ScreenTitle><div className="metrics"><Metric icon={BookOpen} label="Topics reviewed" value={`${coverage}%`} sub={`${progress.studied.length} of ${topics.length} topics`}/><Metric icon={ClipboardCheck} label="Practice tests" value={totalTests} sub="Saved sessions"/><Metric icon={Target} label="Average score" value={`${average}%`} sub="Across completed tests"/><Metric icon={Trophy} label="Best score" value={`${best}%`} sub="Personal best"/></div>
        <div className="progress-grid"><div className="progress-box"><h2>Topic coverage</h2>{topics.map(t=><div className="topic-progress" key={t.id}><span>{t.name}</span><span>{progress.studied.includes(t.id)?<CheckCircle2 className="green" size={19}/>:<Circle size={19} className="muted"/>}</span></div>)}<button className="text-action" onClick={()=>navigate('study')}>Continue studying <ChevronRight size={17}/></button></div>
        <div className="progress-box"><h2>Practice by topic</h2>{grouped.map(g=><div className="topic-progress" key={g.id}><span>{g.name}</span><strong>{g.rows.length?`${Math.round(g.rows.reduce((s,a)=>s+a.score/a.total,0)/g.rows.length*100)}% avg`:'Not tested yet'}</strong></div>)}<button className="text-action" onClick={()=>navigate('quiz')}>Take a practice test <ChevronRight size={17}/></button></div></div>
        <div className="history"><div className="history-title"><h2>Recent tests</h2>{totalTests>0&&<button className="reset-btn" onClick={reset}><RefreshCcw size={15}/> Clear local results</button>}</div>{recent.length?recent.map(a=><div className="history-row" key={a.id}><div><strong>{a.topic==='all'?'Mixed K53 practice':topics.find(t=>t.id===a.topic)?.name||'Practice'}</strong><span>{new Date(a.date).toLocaleDateString('en-ZA',{day:'numeric',month:'short',year:'numeric'})}</span></div><b>{a.score}/{a.total} · {Math.round(a.score/a.total*100)}%</b></div>):<p className="empty">Your results will appear here after you complete a practice test.</p>}</div></>}
      </main><footer className="learner-footer"><span><Clock3 size={15}/> Progress is stored on this device.</span><span>© {new Date().getFullYear()} YouthDrive Solutions <a href={PUBLIC_SITE}><ExternalLink size={14}/> Main website</a></span></footer>
    </div>
  </div>;
}
