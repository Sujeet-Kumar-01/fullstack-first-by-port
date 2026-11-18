import { useEffect, useState } from 'react';

export default function Visions() {
  const [visions, setVisions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:5000/api/visions')
      .then((res) => {
        if (!res.ok) throw new Error('API down');
        return res.json();
      })
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setVisions(data);
        } else {
          setFallback();
        }
        setLoading(false);
      })
      .catch(() => {
        setFallback();
        setLoading(false);
      });
  }, []);

  const setFallback = () => {
    setVisions([
      { title: "Continuous Learning", description: "Mastering modern full-stack development patterns and clean code design." },
      { title: "Scalable Architecture", description: "Building robust Node.js microservices with real-time reactive frontends." },
      { title: "Future Innovation", description: "Creating web systems that solve real-world problems with speed and precision." }
    ]);
  };

  if (loading) return <p style={{ textAlign: 'center', color: '#94a3b8' }}>Loading Visions...</p>;

  return (
    <section>
      <h2 className="section-title">Strategic Vision</h2>
      <div className="vision-grid">
        {visions.map((item, index) => (
          <div key={item._id || index} className="vision-card">
            <span className="number">0{index + 1}</span>
            <h3>{item.title}</h3>
            <p>{item.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}