// src/context/Providers.jsx
import { ThemeProvider } from './ThemeContext';
import { UserProvider } from './UserContext';
import { ProjectsProvider } from './ProjectsContext';
import { CertificationsProvider } from './CertificationsContext';
import { SkillsProvider } from './SkillsContext';
import { ExperienceProvider } from './ExperienceContext';
import { EducationProvider } from './EducationContext';

export function AppProviders({ children }) {
  return (
    <ThemeProvider>
      <UserProvider>
        <ProjectsProvider>
          <CertificationsProvider>
            <SkillsProvider>
              <ExperienceProvider>
                  <EducationProvider>

                {children}
                  </EducationProvider>
              </ExperienceProvider>
            </SkillsProvider>
          </CertificationsProvider>
        </ProjectsProvider>
      </UserProvider>
    </ThemeProvider>
  );
}