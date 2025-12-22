export type Experience = {
  title: string
  company: string
  period: string
  description: string
}

export function ExperienceItem({ title, company, period, description }: Experience) {

  return (
    <div className={"relative border-l-4 pl-6 pb-8 last:pb-0"}>
      <div className={"absolute -left-2 top-0 h-4 w-4 rounded-full bg-black/50"} />
      <h4 className={"font-semibold text-xl"}>{title}</h4>
      <p className={"font-medium mt-1"}>{company}</p>
      <p className={"text-sm mb-3 mt-1"}>{period}</p>
      <p className={"leading-relaxed"}>{description}</p>
    </div>
  )
}


