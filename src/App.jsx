import React, { useEffect, useState } from 'react';

const moods = [
  { name: 'Low', eyes: 'low', mouth: 'low' },
  { name: 'Off', eyes: 'off', mouth: 'off' },
  { name: 'Okay', eyes: 'okay', mouth: 'okay' },
  { name: 'Good', eyes: 'good', mouth: 'good' },
  { name: 'Great', eyes: 'great', mouth: 'great' },
];

const topics = [
  { name: 'Work', icon: 'work', note: 'Deadlines, pressure, or too much to juggle' },
  { name: 'Sleep', icon: 'sleep', note: 'Rest that feels out of reach' },
  { name: 'Relationships', icon: 'people', note: 'The people and moments on your mind' },
  { name: 'Energy', icon: 'energy', note: 'Feeling drained or running on empty' },
  { name: 'Self-esteem', icon: 'spark', note: 'How you’ve been feeling about yourself' },
];

const therapists = [
  {
    id: 'ananya', name: 'Dr. Ananya Rao', initials: 'AR', specialty: 'Stress · Work-life balance', rating: '4.9', reviews: '128', price: '₹1,200', available: 'Today, 6:30 PM',
    detail: 'A warm, practical approach to finding steadier footing through demanding seasons.', tone: 'rose', photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&crop=faces&w=320&h=360&q=82',
  },
  {
    id: 'kabir', name: 'Dr. Kabir Mehta', initials: 'KM', specialty: 'Sleep · Anxiety', rating: '4.8', reviews: '96', price: '₹1,200', available: 'Today, 7:15 PM',
    detail: 'Helps you make sense of restless thoughts and build routines that feel possible.', tone: 'sand', photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&crop=faces&w=320&h=360&q=82',
  },
  {
    id: 'meera', name: 'Dr. Meera Iyer', initials: 'MI', specialty: 'Relationships · Self-esteem', rating: '5.0', reviews: '84', price: '₹1,200', available: 'Tomorrow, 10:00 AM',
    detail: 'Creates a thoughtful space to explore connection, boundaries, and self-trust.', tone: 'blue', photo: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&crop=faces&w=320&h=360&q=82',
  },
];

const dates = Array.from({ length: 4 }, (_, offset) => {
  const date = new Date();
  date.setDate(date.getDate() + offset);
  return {
    day: offset === 0 ? 'TODAY' : new Intl.DateTimeFormat('en', { weekday: 'short' }).format(date).toUpperCase(),
    date: `${date.getDate()}`,
    month: new Intl.DateTimeFormat('en', { month: 'short' }).format(date).toUpperCase(),
  };
});

const times = ['06:30 PM', '07:15 PM', '08:00 PM'];

function Arrow({ left = false, className = '' }) {
  return <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d={left ? 'M19 12H5m0 0 7 7m-7-7 7-7' : 'M5 12h14m0 0-7-7m7 7-7 7'} stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>;
}

function CloseIcon() {
  return <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="m6 6 12 12M18 6 6 18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" /></svg>;
}

function RestartIcon() {
  return <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M20 7v5h-5M20 12a8 8 0 1 1-2.1-5.4L20 7" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" /></svg>;
}

function CheckIcon() {
  return <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="m5 12 4.2 4.2L19 6.5" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" /></svg>;
}

function CalendarIcon() {
  return <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><rect x="3.5" y="5" width="17" height="16" rx="3" stroke="currentColor" strokeWidth="1.7" /><path d="M7.5 3.5v3M16.5 3.5v3M3.5 9.5h17M8 13h2m4 0h2m-8 4h2" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" /></svg>;
}

function Icon({ name, size = 22 }) {
  const props = { viewBox: '0 0 24 24', width: size, height: size, fill: 'none', 'aria-hidden': 'true' };
  const paths = {
    work: <><rect x="3.5" y="7" width="17" height="13" rx="2.5" /><path d="M8.5 7V5.5A1.5 1.5 0 0 1 10 4h4a1.5 1.5 0 0 1 1.5 1.5V7M3.5 12h17M10 12v2h4v-2" /></>,
    sleep: <path d="M19.3 14.7A8.2 8.2 0 0 1 9.3 4.6 8.3 8.3 0 1 0 19.3 14.7Z" />,
    people: <><circle cx="9" cy="8" r="3.2" /><path d="M3.5 19.5v-1a5.5 5.5 0 0 1 11 0v1M16 5a3 3 0 0 1 0 5.8M17.5 14a4.2 4.2 0 0 1 3 4v1.5" /></>,
    energy: <path d="m13.2 2.8-8 11h6l-.5 7.4 8.1-11.6h-6l.4-6.8Z" />,
    spark: <><path d="m12 3 1.7 5.3L19 10l-5.3 1.7L12 17l-1.7-5.3L5 10l5.3-1.7L12 3Z" /><path d="m19 16 .8 2.2L22 19l-2.2.8L19 22l-.8-2.2L16 19l2.2-.8L19 16Z" /></>,
    play: <path d="m9 6 9 6-9 6V6Z" fill="currentColor" stroke="none" />,
    leaf: <><path d="M19.5 4.5c-8.4-.6-14 3.1-14 9a6 6 0 0 0 6 6c5.9 0 9.5-5.7 8.9-14Z" /><path d="M5.5 19.5c2.2-4 5.5-6.4 10-8.2" /></>,
    video: <><rect x="3" y="5.5" width="13" height="13" rx="3" /><path d="m16 10 5-3v10l-5-3" /></>,
    home: <><path d="m3 10 9-7 9 7v10a1.5 1.5 0 0 1-1.5 1.5H4.5A1.5 1.5 0 0 1 3 20V10Z" /><path d="M9 21v-7h6v7" /></>,
    fitness: <><path d="M3 14c1.3 0 1.5-3 3-3s1.7 5 3.3 5S11 7 13 7s1.4 11 3.2 11S18 12 21 12" /><path d="M4 19h16" /></>,
    mind: <><path d="M9 4.5a3.5 3.5 0 0 0-3.3 4.6 3.8 3.8 0 0 0 .3 7.2 3.5 3.5 0 0 0 6 2.2V5.5a3 3 0 0 0-3-1Z" /><path d="M15 4.5a3.5 3.5 0 0 1 3.3 4.6 3.8 3.8 0 0 1-.3 7.2 3.5 3.5 0 0 1-6 2.2V5.5a3 3 0 0 1 3-1Z" /></>,
    store: <><path d="M4 9h16v11.5H4zM3 9l1.7-5h14.6L21 9" /><path d="M3.5 9a2.5 2.5 0 0 0 5 0 2.5 2.5 0 0 0 5 0 2.5 2.5 0 0 0 5 0 2.5 2.5 0 0 0 2.5 0M9 20v-6h6v6" /></>,
    profile: <><circle cx="12" cy="8" r="3.5" /><path d="M4.5 20a7.5 7.5 0 0 1 15 0" /></>,
    heart: <path d="M20.8 8.7c0 5.1-8.8 11-8.8 11s-8.8-5.9-8.8-11A4.8 4.8 0 0 1 12 6.4a4.8 4.8 0 0 1 8.8 2.3Z" />,
  };
  return <svg {...props} stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">{paths[name] || paths.spark}</svg>;
}

function MoodFace({ mood }) {
  return <svg className="mood-face" viewBox="0 0 44 44" fill="none" aria-hidden="true">
    <circle cx="22" cy="22" r="19" fill="rgba(255,255,255,.075)" stroke="rgba(255,255,255,.5)" strokeWidth="1.5" />
    <path d={mood.eyes === 'low' ? 'M14 18q2.2-2 4.5 0M25.5 18q2.2-2 4.5 0' : 'M15.5 18v.1m13 0v.1'} stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
    <path d={mood.mouth === 'low' ? 'M16 30q6-7 12 0' : mood.mouth === 'off' ? 'M17 28h10' : mood.mouth === 'okay' ? 'M17 27q5 2.5 10 0' : mood.mouth === 'good' ? 'M15.5 26q6.5 8 13 0' : 'M14.5 25q7.5 10 15 0'} stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
  </svg>;
}

function TherapistPortrait({ therapist, large = false }) {
  const palette = therapist.tone === 'rose'
    ? { bg: '#8b4f53', shirt: '#e8b7ae', hair: '#261a1e', skin: '#d89d83', light: '#f1c2ac' }
    : therapist.tone === 'sand'
      ? { bg: '#9a795c', shirt: '#586b66', hair: '#251f1b', skin: '#b9795b', light: '#daa183' }
      : { bg: '#456277', shirt: '#d1b4a7', hair: '#1d202a', skin: '#bc846c', light: '#e3ad8d' };
  return <div className={`therapist-portrait ${therapist.tone} ${large ? 'portrait-large' : ''}`} aria-label={`Portrait of ${therapist.name}`} role="img">
    <svg viewBox="0 0 100 100" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <defs>
        <linearGradient id={`bg-${therapist.id}`} x1="0" y1="0" x2="1" y2="1"><stop stopColor={palette.light} /><stop offset="1" stopColor={palette.bg} /></linearGradient>
        <linearGradient id={`skin-${therapist.id}`} x1=".2" y1="0" x2=".8" y2="1"><stop stopColor={palette.light} /><stop offset="1" stopColor={palette.skin} /></linearGradient>
      </defs>
      <rect width="100" height="100" fill={`url(#bg-${therapist.id})`} />
      <circle cx="78" cy="23" r="20" fill="rgba(255,255,255,.1)" />
      <path d="M8 100c3-24 18-34 42-34s39 10 42 34" fill={palette.shirt} />
      <path d="M29 46c-2-20 4-33 21-34 20-1 24 18 20 35l-5 17H34Z" fill={palette.hair} />
      <path d="M37 47c0-13 6-22 15-22s15 9 15 22v11c0 11-7 19-15 19s-15-8-15-19V47Z" fill={`url(#skin-${therapist.id})`} />
      <path d="M35 47c1-17 7-25 19-25 10 0 17 7 19 18-6-1-10-5-13-10-4 6-14 10-25 10Z" fill={palette.hair} />
      <path d="M41 51v1m21-1v1" stroke="#35231f" strokeWidth="2.2" strokeLinecap="round" />
      <path d="M47 64q5 4 10 0" stroke="#8e4d48" strokeWidth="1.8" strokeLinecap="round" />
      <path d="m46 78 4 4 5-4" fill="#fbf3ed" />
      <path d="M48 80h4l8 20H40Z" fill={palette.shirt} />
      <rect y="84" width="100" height="16" fill="rgba(15,18,28,.08)" />
    </svg>
    <img className="therapist-photo" src={therapist.photo} alt="" loading="lazy" onError={(event) => { event.currentTarget.style.display = 'none'; }} />
    {large && <span className="portrait-shine" />}
  </div>;
}

function TopBar({ screen, onBack, onRestart }) {
  const hasBack = !['mood', 'confirmed'].includes(screen);
  return <header className="topbar">
    <button className={`icon-button back-button ${hasBack ? '' : 'invisible'}`} onClick={hasBack ? onBack : undefined} aria-label="Go back">
      <Arrow left />
    </button>
    <button className="brand-lockup" aria-label="CULT.FIT Mind home" onClick={onRestart}>
      <span className="cult-word">CULT<span className="brand-dot">.</span>FIT</span>
      <span className="brand-rule" />
      <span className="mind-word">MIND</span>
    </button>
    <button className="icon-button top-help" aria-label="Restart experience" onClick={onRestart}><RestartIcon /></button>
  </header>;
}

function Progress({ step }) {
  return <div className="progress-row" aria-label={`Step ${step} of 2`}>
    <div className="progress-track"><span style={{ width: `${step * 50}%` }} /></div>
    <span className="progress-label">{step} <span>/ 2</span></span>
  </div>;
}

function BottomNav({ onMind }) {
  return <nav className="bottom-nav" aria-label="CULT.FIT app navigation">
    <button><Icon name="home" size={20} /><span>Home</span></button>
    <button><Icon name="fitness" size={20} /><span>Fitness</span></button>
    <button className="nav-active" onClick={onMind}><Icon name="mind" size={20} /><span>Mind</span></button>
    <button><Icon name="store" size={20} /><span>Store</span></button>
    <button><Icon name="profile" size={20} /><span>You</span></button>
  </nav>;
}

function App() {
  const [screen, setScreen] = useState('mood');
  const [mood, setMood] = useState('');
  const [topic, setTopic] = useState('');
  const [expanded, setExpanded] = useState('ananya');
  const [therapistId, setTherapistId] = useState('ananya');
  const [selectedDate, setSelectedDate] = useState(0);
  const [selectedTime, setSelectedTime] = useState('06:30 PM');
  const [breathIn, setBreathIn] = useState(true);
  const [breathing, setBreathing] = useState(true);
  const [calendarAdded, setCalendarAdded] = useState(false);
  const [showTherapistPicker, setShowTherapistPicker] = useState(false);
  const [resource, setResource] = useState(null);
  const [screenKey, setScreenKey] = useState(0);

  const therapist = therapists.find((item) => item.id === therapistId) || therapists[0];

  useEffect(() => {
    if (screen !== 'reset' || !breathing) return undefined;
    const interval = window.setInterval(() => setBreathIn((value) => !value), 4000);
    return () => window.clearInterval(interval);
  }, [screen, breathing]);

  const go = (next) => {
    setScreen(next);
    setScreenKey((key) => key + 1);
    document.querySelector('.app-main')?.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const restart = () => {
    setMood(''); setTopic(''); setCalendarAdded(false); setBreathing(true); setShowTherapistPicker(false); setResource(null); go('mood');
  };

  const back = () => {
    if (showTherapistPicker) { setShowTherapistPicker(false); return; }
    if (screen === 'topics') go('mood');
    else if (screen === 'actions') go('topics');
    else if (screen === 'reset' || screen === 'resources' || screen === 'therapists') go('actions');
    else if (screen === 'booking') go('therapists');
    else if (screen === 'session') go('confirmed');
    else go('mood');
  };

  const startBooking = (id) => {
    setTherapistId(id);
    setSelectedDate(id === 'meera' ? 1 : 0);
    setSelectedTime(id === 'kabir' ? '07:15 PM' : '06:30 PM');
    go('booking');
  };

  const book = () => go('confirmed');

  const addToCalendar = () => {
    const [clock, meridiem] = selectedTime.split(' ');
    const [hourText, minuteText] = clock.split(':');
    const hour = (Number(hourText) % 12) + (meridiem === 'PM' ? 12 : 0);
    const start = new Date();
    start.setDate(start.getDate() + selectedDate);
    start.setHours(hour, Number(minuteText), 0, 0);
    const end = new Date(start.getTime() + 45 * 60 * 1000);
    const icalDate = (date) => date.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '');
    const escapeIcal = (value) => value.replace(/\\/g, '\\\\').replace(/\n/g, '\\n').replace(/,/g, '\\,').replace(/;/g, '\\;');
    const event = [
      'BEGIN:VCALENDAR', 'VERSION:2.0', 'PRODID:-//CULT.FIT//Mind//EN', 'CALSCALE:GREGORIAN', 'BEGIN:VEVENT',
      `DTSTAMP:${icalDate(new Date())}`, `DTSTART:${icalDate(start)}`, `DTEND:${icalDate(end)}`,
      `SUMMARY:${escapeIcal(`CULT.FIT Mind session with ${therapist.name}`)}`,
      `DESCRIPTION:${escapeIcal('45-minute private video session. Session details will be available before the call.')}`,
      `LOCATION:${escapeIcal('Online video session')}`, 'STATUS:CONFIRMED', 'END:VEVENT', 'END:VCALENDAR', '',
    ].join('\r\n');
    const calendarUrl = URL.createObjectURL(new Blob([event], { type: 'text/calendar;charset=utf-8' }));
    const downloadLink = document.createElement('a');
    downloadLink.href = calendarUrl;
    downloadLink.download = `mind-session-${start.toISOString().slice(0, 10)}.ics`;
    downloadLink.click();
    window.setTimeout(() => URL.revokeObjectURL(calendarUrl), 1000);
    setCalendarAdded(true);
  };

  return <div className="app-shell">
    <div className="ambient-orb ambient-one" />
    <div className="ambient-orb ambient-two" />
    <TopBar screen={screen} onBack={back} onRestart={restart} />

    <main className="app-main" key={screenKey}>
      {screen === 'mood' && <section className="screen checkin-screen enter" aria-labelledby="mood-title">
        <Progress step={1} />
        <div className="eyebrow"><span className="eyebrow-dot" /> A MOMENT FOR YOU</div>
        <h1 id="mood-title">How are you<br />arriving today?</h1>
        <p className="subcopy">There’s no right answer. Just notice what’s here.</p>
        <div className="mood-panel">
          <div className="panel-kicker">RIGHT NOW, I FEEL…</div>
          <div className="mood-options" role="group" aria-label="Choose how you feel">
            {moods.map((option) => <button key={option.name} className={`mood-choice ${mood === option.name ? 'selected' : ''}`} onClick={() => setMood(option.name)} aria-pressed={mood === option.name}>
              <MoodFace mood={option} /><span>{option.name}</span>
            </button>)}
          </div>
        </div>
        <div className="kind-note"><span className="kind-note-icon"><Icon name="spark" size={19} /></span><p>A small check-in can make a little more room for you.</p></div>
        <div className="spacer" />
        <button className="primary-button" disabled={!mood} onClick={() => go('topics')}>Continue <Arrow /></button>
        <div className="privacy-note">PRIVATE TO YOU <span>·</span> TAKES LESS THAN A MINUTE</div>
      </section>}

      {screen === 'topics' && <section className="screen enter" aria-labelledby="topic-title">
        <Progress step={2} />
        <div className="eyebrow"><span className="eyebrow-dot" /> CHECKING IN</div>
        <h1 id="topic-title">What’s taking up<br />space in your mind?</h1>
        <p className="subcopy">Choose the thing that feels loudest today.</p>
        <div className="topic-list" role="group" aria-label="Choose a topic">
          {topics.map((item) => <button key={item.name} className={`topic-card ${topic === item.name ? 'selected' : ''}`} onClick={() => setTopic(item.name)} aria-pressed={topic === item.name}>
            <span className="topic-icon"><Icon name={item.icon} size={20} /></span>
            <span className="topic-text"><strong>{item.name}</strong><small>{item.note}</small></span>
            <span className="radio-check">{topic === item.name && <CheckIcon />}</span>
          </button>)}
        </div>
        <div className="spacer" />
        <button className="primary-button" disabled={!topic} onClick={() => go('actions')}>Continue <Arrow /></button>
        <div className="privacy-note">PRIVATE TO YOU <span>·</span> NO JUDGEMENT, JUST SUPPORT</div>
      </section>}

      {screen === 'actions' && <section className="screen actions-screen enter" aria-labelledby="actions-title">
        <div className="eyebrow"><span className="eyebrow-dot" /> MADE FOR THIS MOMENT</div>
        <h1 id="actions-title">Let’s make the next<br />few minutes easier.</h1>
        <p className="subcopy">A little support for <strong>{topic.toLowerCase() || 'what’s on your mind'}</strong>. Pick what feels right.</p>
        <div className="action-stack">
          <button className="action-card reset-card" onClick={() => { setBreathing(true); setBreathIn(true); go('reset'); }}>
            <span className="action-art reset-art"><span className="art-orbit orbit-one" /><span className="art-orbit orbit-two" /><span className="art-dot" /><span className="art-time">5<br /><small>MIN</small></span></span>
            <span className="action-copy"><span className="action-label">START SMALL</span><strong>5-minute reset</strong><small>A steady pause, right where you are.</small></span>
            <span className="round-arrow"><Arrow /></span>
          </button>
          <button className="action-card resources-card" onClick={() => go('resources')}>
            <span className="action-art resource-art"><span className="resource-sun" /><span className="resource-hill hill-back" /><span className="resource-hill hill-front" /><span className="resource-book"><Icon name="leaf" size={22} /></span></span>
            <span className="action-copy"><span className="action-label">GO AT YOUR PACE</span><strong>Explore resources</strong><small>Thoughtful reads for what’s on your mind.</small></span>
            <span className="round-arrow"><Arrow /></span>
          </button>
          <button className="action-card therapist-cta" onClick={() => go('therapists')}>
            <span className="action-art therapist-art"><TherapistPortrait therapist={therapists[0]} large /><span className="portrait-status"><span /> AVAILABLE</span></span>
            <span className="action-copy"><span className="action-label">TALK IT THROUGH</span><strong>Talk to a therapist</strong><small>A real conversation, when you’re ready.</small></span>
            <span className="round-arrow"><Arrow /></span>
          </button>
        </div>
        <button className="text-button actions-back" onClick={() => go('topics')}><Arrow left /> Change my check-in</button>
      </section>}

      {screen === 'reset' && <section className="screen reset-screen enter" aria-labelledby="reset-title">
        <div className="eyebrow"><span className="eyebrow-dot" /> FIVE MINUTES FOR YOU</div>
        <h1 id="reset-title">Find your<br />own rhythm.</h1>
        <p className="subcopy">Follow the circle. Nothing to get right.</p>
        <div className={`breath-wrap ${breathing ? '' : 'paused'}`}>
          <div className="breath-halo halo-one" /><div className="breath-halo halo-two" />
          <div className="breath-orb"><span className="breath-orb-inner" /><div className="breath-copy"><span>{breathing ? (breathIn ? 'Breathe in' : 'Breathe out') : 'Paused'}</span><small>{breathing ? (breathIn ? 'Gently, through your nose' : 'Slowly, let it go') : 'Take your time'}</small></div></div>
        </div>
        <div className="breath-meter"><span className={breathIn && breathing ? 'meter-active' : ''} /><span className={!breathIn && breathing ? 'meter-active' : ''} /></div>
        <div className="breath-timer"><span className="timer-dot" /> 5:00 <span>·</span> 4 second breaths</div>
        <div className="reset-controls"><button className="secondary-button" onClick={() => setBreathing((value) => !value)}>{breathing ? 'Pause' : 'Resume'}</button><button className="primary-button" onClick={() => go('actions')}>I’m feeling better <Arrow /></button></div>
        <p className="gentle-reminder">Your pace is the right pace.</p>
      </section>}

      {screen === 'resources' && <section className="screen resources-screen enter" aria-labelledby="resources-title">
        <div className="eyebrow"><span className="eyebrow-dot" /> A LITTLE SPACE TO THINK</div>
        <h1 id="resources-title">Read, listen,<br />or just begin.</h1>
        <p className="subcopy">A few gentle starting points for {topic.toLowerCase() || 'today'}.</p>
        <div className="resource-intro"><div className="resource-intro-art"><span className="resource-sun" /><span className="resource-hill hill-back" /><span className="resource-hill hill-front" /><Icon name="leaf" size={35} /></div><div><span className="action-label">A GOOD PLACE TO START</span><strong>Take it one thought at a time</strong><small>Small reflections can change how a day feels.</small></div></div>
        <div className="resources-heading"><span>MADE FOR YOU</span><span>3 MIN READ</span></div>
        {[
          { title: 'When work follows you home', type: 'A 3-minute read', icon: 'work' },
          { title: 'A softer landing at the end of the day', type: 'A short audio pause', icon: 'sleep' },
          { title: 'You don’t have to figure it all out', type: 'A gentle reminder', icon: 'spark' },
        ].map((item, i) => <button key={item.title} className="resource-row" onClick={() => setResource(item)}><span className={`resource-row-icon row-${i}`}><Icon name={item.icon} size={20} /></span><span><strong>{item.title}</strong><small>{item.type}</small></span><span className="row-play"><Icon name={i === 1 ? 'play' : 'leaf'} size={18} /></span></button>)}
        <button className="primary-button resource-therapist-button" onClick={() => go('therapists')}>Talk to a therapist <Arrow /></button>
        {resource && <div className="modal-backdrop" role="presentation" onClick={() => setResource(null)}><div className="resource-modal" role="dialog" aria-modal="true" aria-labelledby="resource-modal-title" onClick={(event) => event.stopPropagation()}><button className="icon-button modal-close" onClick={() => setResource(null)} aria-label="Close resource"><CloseIcon /></button><span className="action-label">A MOMENT TO REFLECT</span><h2 id="resource-modal-title">{resource.title}</h2><p>Pause for a beat. Notice what your body is telling you, and let one thought be enough for right now.</p><div className="modal-prompt"><Icon name="spark" size={20} /><span>What would feel a little kinder in this moment?</span></div><button className="primary-button" onClick={() => setResource(null)}>That’s enough for now <Arrow /></button></div></div>}
      </section>}

      {screen === 'therapists' && <section className="screen therapists-screen enter" aria-labelledby="therapists-title">
        <div className="eyebrow"><span className="eyebrow-dot" /> REAL PEOPLE, HERE FOR YOU</div>
        <h1 id="therapists-title">Talk to someone<br />who gets it.</h1>
        <p className="subcopy">Licensed therapists, ready when you are.</p>
        <div className="trust-strip"><span><CheckIcon /> Verified professionals</span><i /> <span><Icon name="heart" size={17} /> Private & confidential</span></div>
        <div className="therapist-list">
          {therapists.map((person) => <article className={`therapist-card ${expanded === person.id ? 'expanded' : ''}`} key={person.id}>
            <button className="therapist-main" onClick={() => setExpanded((current) => current === person.id ? '' : person.id)} aria-expanded={expanded === person.id}>
              <TherapistPortrait therapist={person} />
              <span className="therapist-info"><strong>{person.name}</strong><small>{person.specialty}</small><span className="therapist-rating"><b>★</b> {person.rating} <em>({person.reviews})</em><span>·</span><strong>{person.price}</strong></span></span>
              <span className={`expand-chevron ${expanded === person.id ? 'open' : ''}`}><Arrow /></span>
            </button>
            {expanded === person.id && <div className="therapist-expanded"><p>{person.detail}</p><div className="availability"><span className="availability-dot" /><span>Next available</span><strong>{person.available}</strong></div><button className="book-therapist" onClick={() => startBooking(person.id)}>View times <Arrow /></button></div>}
          </article>)}
        </div>
        <div className="therapist-footer"><span className="lock-mark">⌑</span><span>Your conversations stay between you and your therapist.</span></div>
      </section>}

      {screen === 'booking' && <section className="screen booking-screen enter" aria-labelledby="booking-title">
        <div className="eyebrow"><span className="eyebrow-dot" /> YOUR SESSION</div>
        <h1 id="booking-title">A little time<br />for you.</h1>
        <p className="subcopy">Choose a time that feels comfortable.</p>
        <button className="booking-therapist" onClick={() => setShowTherapistPicker(true)}><TherapistPortrait therapist={therapist} /><span><small>SESSION WITH</small><strong>{therapist.name}</strong><em>{therapist.specialty}</em></span><span className="change-link">Change</span></button>
        <div className="section-label"><span>CHOOSE A DATE</span><CalendarIcon /></div>
        <div className="date-picker" role="group" aria-label="Choose a date">{dates.map((date, index) => <button key={date.date} className={`date-pill ${selectedDate === index ? 'selected' : ''}`} onClick={() => setSelectedDate(index)} aria-pressed={selectedDate === index}><span>{date.day}</span><strong>{date.date}</strong><small>{date.month}</small></button>)}</div>
        <div className="section-label"><span>AVAILABLE TIMES</span><span className="timezone">IST · UTC+5:30</span></div>
        <div className="time-grid" role="group" aria-label="Choose a time">{times.map((time) => <button key={time} className={`time-pill ${selectedTime === time ? 'selected' : ''}`} onClick={() => setSelectedTime(time)} aria-pressed={selectedTime === time}>{time}</button>)}</div>
        <div className="session-details"><div><span className="detail-icon"><Icon name="video" size={18} /></span><span><strong>Video session</strong><small>45 minutes · One-on-one</small></span><span className="detail-check"><CheckIcon /></span></div><div><span className="detail-icon price-icon">₹</span><span><strong>Session price</strong><small>Inclusive of all taxes</small></span><b className="session-price">₹1,200</b></div></div>
        <button className="primary-button book-session-button" onClick={book}>Book session <Arrow /></button>
        <div className="privacy-note">SECURE PAYMENT <span>·</span> PRIVATE & CONFIDENTIAL</div>
        {showTherapistPicker && <div className="modal-backdrop picker-backdrop" role="presentation" onClick={() => setShowTherapistPicker(false)}><div className="therapist-picker" role="dialog" aria-modal="true" aria-labelledby="picker-title" onClick={(event) => event.stopPropagation()}><div className="picker-head"><div><span className="action-label">FIND YOUR PERSON</span><h2 id="picker-title">Choose a therapist</h2></div><button className="icon-button modal-close" onClick={() => setShowTherapistPicker(false)} aria-label="Close therapist picker"><CloseIcon /></button></div>{therapists.map((person) => <button key={person.id} className={`picker-option ${therapistId === person.id ? 'selected' : ''}`} onClick={() => { setTherapistId(person.id); setSelectedTime(person.id === 'kabir' ? '07:15 PM' : '06:30 PM'); setShowTherapistPicker(false); }}><TherapistPortrait therapist={person} /><span><strong>{person.name}</strong><small>{person.specialty}</small><span className="picker-rating">★ {person.rating} <em>· {person.available}</em></span></span>{therapistId === person.id && <span className="radio-check"><CheckIcon /></span>}</button>)}</div></div>}
      </section>}

      {screen === 'confirmed' && <section className="screen confirmation-screen enter" aria-labelledby="confirmed-title">
        <div className="confirmation-art"><div className="confirm-glow" /><div className="confirm-ring ring-a" /><div className="confirm-ring ring-b" /><div className="confirm-check"><CheckIcon /></div><span className="sparkle sparkle-a">✳</span><span className="sparkle sparkle-b">✦</span><span className="sparkle sparkle-c">✳</span></div>
        <div className="eyebrow centered"><span className="eyebrow-dot" /> YOU SHOWED UP FOR YOU</div>
        <h1 id="confirmed-title">Booking<br />confirmed.</h1>
        <p className="subcopy centered-copy">You’re taking a step for yourself.</p>
        <div className="confirmation-session"><div className="confirm-person"><TherapistPortrait therapist={therapist} /><span><small>YOUR THERAPIST</small><strong>{therapist.name}</strong><em>45 min · Video</em></span></div><div className="confirm-divider" /><div className="confirm-datetime"><span className="detail-icon"><CalendarIcon /></span><span><strong>{dates[selectedDate].day === 'TODAY' ? 'Today' : `${dates[selectedDate].day}, ${dates[selectedDate].date} ${dates[selectedDate].month}`} · {selectedTime}</strong><small>Private video session</small></span></div></div>
        <div className="confidential"><span className="confidential-lock">⌑</span><span>Private & confidential</span><CheckIcon /></div>
        <div className="confirmation-actions"><button className="primary-button" onClick={() => go('session')}>View session <Arrow /></button><button className={`secondary-button calendar-button ${calendarAdded ? 'added' : ''}`} onClick={addToCalendar}>{calendarAdded ? <CheckIcon /> : <CalendarIcon />}{calendarAdded ? 'Added to calendar' : 'Add to calendar'}</button></div>
        <button className="text-button confirmation-home" onClick={restart}>Back to Mind</button>
      </section>}

      {screen === 'session' && <section className="screen session-screen enter" aria-labelledby="session-title">
        <div className="eyebrow"><span className="eyebrow-dot" /> YOUR SESSION</div>
        <h1 id="session-title">You’ve got<br />this time held.</h1>
        <p className="subcopy">Whenever you’re ready, your therapist will be there.</p>
        <div className="session-hero"><TherapistPortrait therapist={therapist} large /><span className="session-hero-shade" /><span className="session-hero-copy"><small>YOUR THERAPIST</small><strong>{therapist.name}</strong><em>{therapist.specialty}</em></span><span className="hero-status"><span /> CONFIRMED</span></div>
        <div className="session-details session-page-details"><div><span className="detail-icon"><CalendarIcon /></span><span><strong>{dates[selectedDate].day === 'TODAY' ? 'Today' : `${dates[selectedDate].day}, ${dates[selectedDate].date} ${dates[selectedDate].month}`}</strong><small>{selectedTime} · 45 minutes</small></span></div><div><span className="detail-icon"><Icon name="video" size={18} /></span><span><strong>Video session</strong><small>Join link will be available before your session</small></span></div></div>
        <div className="confidential session-confidential"><span className="confidential-lock">⌑</span><span>Private & confidential</span><CheckIcon /></div>
        <button className="primary-button session-done" onClick={restart}>Done <Arrow /></button>
        <button className="text-button" onClick={addToCalendar}>{calendarAdded ? 'Added to calendar ✓' : 'Add to calendar'}</button>
      </section>}
    </main>

    {['mood', 'topics'].includes(screen) && <BottomNav onMind={restart} />}
    <div className="gesture-bar"><span /></div>
  </div>;
}

export default App;
