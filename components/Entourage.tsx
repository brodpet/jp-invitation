import Chapter from './Chapter';
import { parents, roles } from '@/lib/content';

function NameList({ names }: { names: string[] }) {
  return (
    <ul>
      {names.map((n) => (
        <li key={n}>{n}</li>
      ))}
    </ul>
  );
}

export default function Entourage() {
  return (
    <Chapter
      id="entourage"
      number="04"
      tint
      title={
        <>
          The <em>Entourage</em>
        </>
      }
    >
      <div className="parents">
        <div>
          <h2>Parents of the Bride</h2>
          <NameList names={parents.bride} />
        </div>
        <div>
          <h2>Parents of the Groom</h2>
          <NameList names={parents.groom} />
        </div>
      </div>

      <div className="roles">
        {roles.map((r) => (
          <div className={`role${r.lead ? ' role-lead' : ''}`} key={r.title}>
            <h2>{r.title}</h2>
            <NameList names={r.names} />
          </div>
        ))}
      </div>
    </Chapter>
  );
}
