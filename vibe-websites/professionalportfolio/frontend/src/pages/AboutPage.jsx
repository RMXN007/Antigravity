import React from 'react';
import Stats from '../components/features/Stats';
import GamingSetup from '../components/features/GamingSetup';
import Goals from '../components/features/Goals';

const AboutPage = () => {
  return (
    <div className="pt-24">
      <Stats />
      <GamingSetup />
      <Goals />
    </div>
  );
};

export default AboutPage;
