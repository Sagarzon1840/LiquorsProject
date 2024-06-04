import React from "react";
import { CardTeam } from "@/components/cardTeam/cardTeam";
import { ITeamMember } from "@/interfaces/interfaz";
import { team } from "@/utils/arrayTeam";
const AboutUs = () => {
  const teamMembers = team;

  return (

    <div className="mx-large">
      <h1 className="text-black text-center">Conoce mas sobre nosotros</h1>
      <section className="my-10 flex flex-col gap-6">
        <h2 className="text-black text-center">¿quienes somos?</h2>
        <div className="flex flex-row items-center justify-center gap-20 mx-28">
          <img src="/about.png" className="h-64" alt="team" />
          <p className="body1">
            Somos un equipo de siete talentosos desarrolladores, cuatro
            especializados en backend y tres en frontend, que nos hemos reunido
            para realizar un emocionante proyecto. Todos nosotros nos formamos en
            la academia SoyHenrry, donde adquirimos una sólida base técnica y una
            pasión compartida por el desarrollo de software. Nuestro objetivo es
            colaborar estrechamente, aprovechar nuestras habilidades
            complementarias y superar cualquier desafío para lograr los objetivos
            del proyecto con la mayor calidad y eficiencia!
          </p>
        </div>
      </section>
      <section className="my-10 flex flex-col gap-6">
        <h2 className="text-black text-center">Nuestro equipo</h2>
        <div className="flex flex-row gap-10 items-center justify-center">
          {teamMembers.map((member: ITeamMember) => (
            <CardTeam

              key={member.id}
              id={member.id}
              name={member.name}
              role={member.role}
              GitHub={member.GitHub}
              LinkedIn={member.LinkedIn}

              img={member.img}
            />
          ))}
        </div>
      </section>
    </div>
  );
};

export default AboutUs;
