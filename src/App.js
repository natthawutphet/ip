import React, { useState, useEffect } from 'react';

const App = () => {
  const [visitorCount, setVisitorCount] = useState(0);

  useEffect(() => {
    const eventSource = new EventSource('/status');

    eventSource.onmessage = (event) => {
      const data = JSON.parse(event.data);
      const visitorCount = data.visitorCount;

      setVisitorCount(visitorCount);
    };

    eventSource.onerror = () => {
      console.error('เกิดข้อผิดพลาดในการเชื่อมต่อกับเซิร์ฟเวอร์');
    };

    return () => {
      eventSource.close();
    };
  }, []);

  return (
    <div>
      <h1>จำนวนผู้เยี่ยมชม: {visitorCount}</h1>
    </div>
  );
};

export default App;
