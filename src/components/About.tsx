interface AboutProps {
  sectionRef: (el: HTMLElement | null) => void
}

export default function About({ sectionRef }: AboutProps) {
  return (
    <section id="about" ref={sectionRef} className="mb-24 scroll-mt-24">
      <h2 className="text-xs font-medium tracking-widest text-foreground mb-8 lg:hidden">
        ABOUT
      </h2>
      <div className="space-y-4 text-muted-foreground leading-relaxed">
        <p>
          I'm a web developer based in Cagayan de Oro City, Philippines, with
          experience working remotely with international teams. Over the years,
          I've worked on a wide range of projects, from content-driven websites
          to large, data-heavy web applications used in production.
        </p>
        <p>
          My work sits at the intersection of frontend and backend development.
          I enjoy building interfaces that feel natural to use while making
          sure the systems behind them are scalable and easy to maintain. I've
          spent most of my career working with JavaScript frameworks and
          PHP-based backends, collaborating closely with designers, product
          managers, and other engineers.
        </p>
        <p>
          Outside of work, I enjoy refining my workflows, learning new tools,
          and continuously improving how I approach problem-solving in both
          code and design.
        </p>
      </div>
    </section>
  )
}
