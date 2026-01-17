import { navItems } from '../data/navItems'

interface NavigationProps {
  activeSection: string
  onNavigate: (sectionId: string) => void
}

export default function Navigation({
  activeSection,
  onNavigate,
}: NavigationProps) {
  return (
    <nav className="hidden lg:block mt-16">
      <ul className="space-y-4">
        {navItems.map(item => (
          <li key={item.id}>
            <button
              onClick={() => onNavigate(item.id)}
              className={`group flex items-center gap-4 text-xs font-medium tracking-widest transition-all ${
                activeSection === item.id
                  ? 'text-foreground'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <span
                className={`h-px transition-all ${
                  activeSection === item.id
                    ? 'w-16 bg-foreground'
                    : 'w-8 bg-muted-foreground group-hover:w-16 group-hover:bg-foreground'
                }`}
              />
              {item.label}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  )
}
