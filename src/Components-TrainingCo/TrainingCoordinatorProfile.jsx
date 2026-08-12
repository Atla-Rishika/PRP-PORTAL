import React from 'react';
import DashboardHeader from '../Resusable-Components/DashboardHeader';
import profileLarge from '../assets/TCAssets/ProfilePage/profileLarge.png';
import profileSmall from '../assets/TCAssets/ProfilePage/profileSmall.png';
import personalInfoIcon from '../assets/TCAssets/ProfilePage/personalInfoIcon.png';
import professionalInfoIcon from '../assets/TCAssets/ProfilePage/professionalInfoIcon.png';
import aboutMeIcon from '../assets/TCAssets/ProfilePage/aboutMeIcon.png';
import editIcon from '../assets/TCAssets/ProfilePage/editIcon.png';
import activeBadge from '../assets/TCAssets/ProfilePage/activeBadge.png';
import mailIcon from '../assets/TCAssets/ProfilePage/mailIcon.png';
import phoneIcon from '../assets/TCAssets/ProfilePage/phoneIcon.png';
import locationIcon from '../assets/TCAssets/ProfilePage/locationIcon.png';
import './TrainingCoordinatorProfile.css';

const TrainingCoordinatorProfile = () => {
  const personalInfo = [
    { label: 'Email', value: 'priya5@eduhire.com' },
    { label: 'Phone no', value: '+1 (555) 012-3456' },
    { label: 'Date of birth', value: 'October 14, 1988' },
    { label: 'Gender', value: 'Female' },
    { label: 'Address', value: '745 ECR road ,Chennai - 100010' },
  ];

  const professionalInfo = [
    { label: 'Designation', value: 'Training Co-ordinater' },
    { label: 'Employee Id', value: 'TR-2024-2349' },
    { label: 'Experience', value: '6+ years' },
    { label: 'Joined On', value: 'Apr 15, 2024' },
    { label: 'Institute Address', value: '745 OMR road ,Chennai - 105215' },
  ];

  return (
    <div className="trainingCoordinatorProfile">
      <DashboardHeader
        role="Recruiter"
        userName="Priyanka"
        profileImage={profileSmall}
        notificationCount={5}
        messageCount={3}
      />

      <div className="trainingCoordinatorProfile__profileCard">
        <div className="trainingCoordinatorProfile__purpleSection">
          <div className="trainingCoordinatorProfile__contactBar">
            <span className="trainingCoordinatorProfile__contactItem">
              <img src={mailIcon} alt="" className="trainingCoordinatorProfile__contactIcon" />
              priya5@eduhire.com
            </span>
            <span className="trainingCoordinatorProfile__contactItem">
              <img src={phoneIcon} alt="" className="trainingCoordinatorProfile__contactIcon" />
              +91 9632417896
            </span>
            <span className="trainingCoordinatorProfile__contactItem">
              <img src={locationIcon} alt="" className="trainingCoordinatorProfile__contactIcon" />
              Chennai,Tamil Nadu
            </span>
          </div>

          <p className="trainingCoordinatorProfile__bio">
            Passionate about building career-ready students through structured training
            programs and continuous learning initiations.
          </p>
        </div>

        <div className="trainingCoordinatorProfile__avatarWrap">
          <img
            src={profileLarge}
            alt="Priyanka"
            className="trainingCoordinatorProfile__avatar"
          />
          <img
            src={activeBadge}
            alt="Active"
            className="trainingCoordinatorProfile__activeBadge"
          />
        </div>

        <div className="trainingCoordinatorProfile__nameBlock">
          <h2 className="trainingCoordinatorProfile__name">Priyanka</h2>
          <p className="trainingCoordinatorProfile__designation">Training Co-ordinator</p>
        </div>

        <button className="trainingCoordinatorProfile__editBtn" type="button">
          <img src={editIcon} alt="" className="trainingCoordinatorProfile__editIcon" />
          Edit Profile
        </button>
      </div>

      <div className="trainingCoordinatorProfile__infoGrid">
        <div className="trainingCoordinatorProfile__infoCard">
          <div className="trainingCoordinatorProfile__infoCardHeading">
            <img src={personalInfoIcon} alt="" className="trainingCoordinatorProfile__infoCardIcon" />
            <h3>Personal Information</h3>
          </div>
          <div className="trainingCoordinatorProfile__infoCardFields">
            {personalInfo.map((field) => (
              <div className="trainingCoordinatorProfile__field" key={field.label}>
                <p className="trainingCoordinatorProfile__fieldLabel">{field.label}</p>
                <p className="trainingCoordinatorProfile__fieldValue">{field.value}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="trainingCoordinatorProfile__infoCard">
          <div className="trainingCoordinatorProfile__infoCardHeading">
            <img src={professionalInfoIcon} alt="" className="trainingCoordinatorProfile__infoCardIcon" />
            <h3>Professional Information</h3>
          </div>
          <div className="trainingCoordinatorProfile__infoCardFields">
            {professionalInfo.map((field) => (
              <div className="trainingCoordinatorProfile__field" key={field.label}>
                <p className="trainingCoordinatorProfile__fieldLabel">{field.label}</p>
                <p className="trainingCoordinatorProfile__fieldValue">{field.value}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="trainingCoordinatorProfile__aboutCard">
        <div className="trainingCoordinatorProfile__infoCardHeading">
          <img src={aboutMeIcon} alt="" className="trainingCoordinatorProfile__infoCardIcon" />
          <h3>About Me</h3>
        </div>
        <p className="trainingCoordinatorProfile__aboutText">
          I coordinate ene-to-end training operations including batch planning, trainer
          allocation, session scheduling, assessments, and student progress tracking. I strive
          to ensure every student gets the rights training at the right time.
        </p>
      </div>
    </div>
  );
};

export default TrainingCoordinatorProfile;
