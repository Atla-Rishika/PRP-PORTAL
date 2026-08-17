import React, { useRef, useState } from 'react';
import DashboardHeader from '../Resusable-Components/DashboardHeader';
import profileLarge from '../assets/TCAssets/ProfilePage/profileLarge.png';
import profileSmall from '../assets/TCAssets/ProfilePage/profileSmall.png';
import personalInfoIcon from '../assets/TCAssets/ProfilePage/personalInfoIcon.png';
import professionalInfoIcon from '../assets/TCAssets/ProfilePage/professionalInfoIcon.png';
import aboutMeIcon from '../assets/TCAssets/ProfilePage/aboutMeIcon.png';
import editIcon from '../assets/TCAssets/ProfilePage/editIcon.png';
import cameraIcon from '../assets/TCAssets/ProfilePage/cameraIcon.png';
import activeBadge from '../assets/TCAssets/ProfilePage/activeBadge.png';
import mailIcon from '../assets/TCAssets/ProfilePage/mailIcon.png';
import phoneIcon from '../assets/TCAssets/ProfilePage/phoneIcon.png';
import locationIcon from '../assets/TCAssets/ProfilePage/locationIcon.png';
import './TrainingCoordinatorProfile.css';


const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_PATTERN = /^[+]?[\d\s()-]{7,20}$/;
const EMPLOYEE_ID_PATTERN = /^[A-Za-z]{1,6}-\d{4}-\d{2,6}$/;
const EXPERIENCE_PATTERN = /^\d+(\.\d+)?\+?\s*(year|years|yr|yrs)$/i;

const GENDER_OPTIONS = ['Female', 'Male', 'Non-binary', 'Prefer not to say'];

const PHOTO_ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp'];
const PHOTO_MAX_SIZE_MB = 2;
const PHOTO_MAX_SIZE_BYTES = PHOTO_MAX_SIZE_MB * 1024 * 1024;

const isBlank = (value) => !value || !value.trim();

const validatePhotoFile = (file) => {
  if (!file) return 'Profile photo is required.';
  if (!PHOTO_ALLOWED_TYPES.includes(file.type)) {
    return 'Photo must be a JPG, PNG, or WEBP image.';
  }
  if (file.size > PHOTO_MAX_SIZE_BYTES) {
    return `Photo must be smaller than ${PHOTO_MAX_SIZE_MB}MB.`;
  }
  return '';
};


const validators = {
  required: (value, label) => (isBlank(value) ? `${label} is required.` : ''),
  email: (value, label) => {
    if (isBlank(value)) return `${label} is required.`;
    if (!EMAIL_PATTERN.test(value.trim())) return `Enter a valid ${label.toLowerCase()}.`;
    return '';
  },
  phone: (value, label) => {
    if (isBlank(value)) return `${label} is required.`;
    if (!PHONE_PATTERN.test(value.trim())) return `Enter a valid ${label.toLowerCase()}.`;
    return '';
  },
  minLength: (min) => (value, label) => {
    if (isBlank(value)) return `${label} is required.`;
    if (value.trim().length < min) return `${label} should be at least ${min} characters.`;
    return '';
  },
  oneOf: (options) => (value, label) => {
    if (isBlank(value)) return `${label} is required.`;
    if (!options.includes(value)) return `Select a valid ${label.toLowerCase()}.`;
    return '';
  },
  pattern: (regex, message) => (value, label) => {
    if (isBlank(value)) return `${label} is required.`;
    if (!regex.test(value.trim())) return message || `Enter a valid ${label.toLowerCase()}.`;
    return '';
  },
};


const PERSONAL_FIELDS = [
  { key: 'email', label: 'Email' },
  { key: 'phoneNo', label: 'Phone no' },
  { key: 'dob', label: 'Date of birth' },
  { key: 'gender', label: 'Gender' },
  { key: 'address', label: 'Address' },
];


const PERSONAL_VALIDATORS = {
  email: (value) => validators.email(value, 'Email'),
  phoneNo: (value) => validators.phone(value, 'Phone no'),
  dob: (value) => validators.minLength(6)(value, 'Date of birth'),
  gender: (value) => validators.oneOf(GENDER_OPTIONS)(value, 'Gender'),
  address: (value) => validators.minLength(10)(value, 'Address'),
};


const validateAboutMe = (value) => validators.minLength(20)(value, 'About Me');

const PROFESSIONAL_FIELDS = [
  { key: 'proDesignation', label: 'Designation' },
  { key: 'employeeId', label: 'Employee Id' },
  { key: 'experience', label: 'Experience' },
  { key: 'joinedOn', label: 'Joined On' },
  { key: 'instituteAddress', label: 'Institute Address' },
];


const PROFESSIONAL_VALIDATORS = {
  proDesignation: (value) => validators.required(value, 'Designation'),
  employeeId: (value) =>
    validators.pattern(EMPLOYEE_ID_PATTERN, 'Employee id should look like "TR-2024-2349".')(
      value,
      'Employee Id'
    ),
  experience: (value) =>
    validators.pattern(EXPERIENCE_PATTERN, 'Experience should look like "6+ years".')(
      value,
      'Experience'
    ),
  joinedOn: (value) => validators.required(value, 'Joined On'),
  instituteAddress: (value) => validators.minLength(10)(value, 'Institute Address'),
};

const INITIAL_PROFILE = {
  name: 'Priyanka',
  designation: 'Training Co-ordinator',
  photo: profileLarge,
  email: 'priya5@eduhire.com',
  phoneNo: '+91 9632417896',
  dob: 'October 14, 1988',
  gender: 'Female',
  address: '745 ECR road ,Chennai - 100010',
  proDesignation: 'Training Co-ordinator',
  employeeId: 'TR-2024-2349',
  experience: '6+ years',
  joinedOn: 'Apr 15, 2024',
  instituteAddress: '745 OMR road ,Chennai - 105215',
  bioText:
    'Passionate about building career-ready students through structured training ' +
    'programs and continuous learning initiations.',
  aboutMeText:
    'I coordinate end-to-end training operations including batch planning, trainer ' +
    'allocation, session scheduling, assessments, and student progress tracking. I strive ' +
    'to ensure every student gets the right training at the right time.',
};

const TrainingCoordinatorProfile = () => {
  const [savedProfile, setSavedProfile] = useState(INITIAL_PROFILE);
  const [draftProfile, setDraftProfile] = useState(INITIAL_PROFILE);
  const [isEditing, setIsEditing] = useState(false);
  const [errors, setErrors] = useState({});
  const photoInputRef = useRef(null);

  
  const handlePersonalChange = (key, value) => {
    setDraftProfile((prev) => ({ ...prev, [key]: value }));
    if (errors[key]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[key];
        return next;
      });
    }
  };

  const handlePhotoButtonClick = () => {
    if (photoInputRef.current) {
      photoInputRef.current.click();
    }
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files && e.target.files[0];
    e.target.value = '';
    if (!file) return;

    const photoError = validatePhotoFile(file);
    if (photoError) {
      setErrors((prev) => ({ ...prev, photo: photoError }));
      return;
    }

    setErrors((prev) => {
      const next = { ...prev };
      delete next.photo;
      return next;
    });

    const reader = new FileReader();
    reader.onload = () => {
      setDraftProfile((prev) => ({ ...prev, photo: reader.result }));
    };
    reader.readAsDataURL(file);
  };

  const startEditing = () => {
    setDraftProfile(savedProfile);
    setErrors({});
    setIsEditing(true);
  };

  const handleCancel = () => {
    setDraftProfile(savedProfile);
    setErrors({});
    setIsEditing(false);
  };

  const handleSave = () => {
    const nextErrors = {};

    PERSONAL_FIELDS.forEach((field) => {
      const error = PERSONAL_VALIDATORS[field.key](draftProfile[field.key]);
      if (error) nextErrors[field.key] = error;
    });

    if (!draftProfile.photo) {
      nextErrors.photo = 'Profile photo is required.';
    } else if (errors.photo) {
      nextErrors.photo = errors.photo;
    }

    const aboutMeError = validateAboutMe(draftProfile.aboutMeText);
    if (aboutMeError) nextErrors.aboutMeText = aboutMeError;

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      return;
    }

    setSavedProfile(draftProfile);
    setErrors({});
    setIsEditing(false);
  };

  const profile = isEditing ? draftProfile : savedProfile;

  const renderPersonalField = (field) => {
    if (!isEditing) {
      return (
        <div className="trainingCoordinatorProfile__field" key={field.key}>
          <p className="trainingCoordinatorProfile__fieldLabel">{field.label}</p>
          <p className="trainingCoordinatorProfile__fieldValue">{profile[field.key]}</p>
        </div>
      );
    }

    const value = draftProfile[field.key];
    const error = errors[field.key];
    const inputClassName = `trainingCoordinatorProfile__fieldInput${
      error ? ' trainingCoordinatorProfile__fieldInput--error' : ''
    }`;

    return (
      <div className="trainingCoordinatorProfile__field" key={field.key}>
        <p className="trainingCoordinatorProfile__fieldLabel">{field.label}</p>
        {field.key === 'gender' ? (
          <select
            className={inputClassName}
            value={value}
            onChange={(e) => handlePersonalChange(field.key, e.target.value)}
          >
            <option value="" disabled>
              Select gender
            </option>
            {GENDER_OPTIONS.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        ) : (
          <input
            type="text"
            className={inputClassName}
            value={value}
            onChange={(e) => handlePersonalChange(field.key, e.target.value)}
          />
        )}
        {error && <p className="trainingCoordinatorProfile__fieldError">{error}</p>}
      </div>
    );
  };

 
  const renderProfessionalField = (field) => {
    const value = savedProfile[field.key];
    const error = PROFESSIONAL_VALIDATORS[field.key](value);

    return (
      <div className="trainingCoordinatorProfile__field" key={field.key}>
        <p className="trainingCoordinatorProfile__fieldLabel">{field.label}</p>
        <p className="trainingCoordinatorProfile__fieldValue">{value}</p>
        {error && <p className="trainingCoordinatorProfile__fieldError">{error}</p>}
      </div>
    );
  };

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
              {profile.email}
            </span>
            <span className="trainingCoordinatorProfile__contactItem">
              <img src={phoneIcon} alt="" className="trainingCoordinatorProfile__contactIcon" />
              {profile.phoneNo}
            </span>
            <span className="trainingCoordinatorProfile__contactItem">
              <img src={locationIcon} alt="" className="trainingCoordinatorProfile__contactIcon" />
              {profile.address}
            </span>
          </div>

          <p className="trainingCoordinatorProfile__bio">{profile.bioText}</p>
        </div>

        <div className="trainingCoordinatorProfile__avatarWrap">
          <img
            src={profile.photo}
            alt={profile.name}
            className="trainingCoordinatorProfile__avatar"
          />
          <img
            src={activeBadge}
            alt="Active"
            className="trainingCoordinatorProfile__activeBadge"
          />
          {isEditing && (
            <>
              <button
                type="button"
                className="trainingCoordinatorProfile__photoEditBtn"
                onClick={handlePhotoButtonClick}
                aria-label="Change profile photo"
              >
                <img src={cameraIcon} alt="" className="trainingCoordinatorProfile__photoEditIcon" />
              </button>
              <input
                ref={photoInputRef}
                type="file"
                accept="image/jpeg,image/png,image/webp"
                className="trainingCoordinatorProfile__photoInput"
                onChange={handlePhotoChange}
              />
            </>
          )}
        </div>
        {isEditing && errors.photo && (
          <p className="trainingCoordinatorProfile__fieldError trainingCoordinatorProfile__photoError">
            {errors.photo}
          </p>
        )}

        <div className="trainingCoordinatorProfile__nameBlock">
          <h2 className="trainingCoordinatorProfile__name">{profile.name}</h2>
          <p className="trainingCoordinatorProfile__designation">{profile.designation}</p>
        </div>

        <button
          className="trainingCoordinatorProfile__editBtn"
          type="button"
          onClick={startEditing}
          disabled={isEditing}
        >
          <img src={editIcon} alt="" className="trainingCoordinatorProfile__editIcon" />
          {isEditing ? 'Editing…' : 'Edit Profile'}
        </button>
      </div>

      <div className="trainingCoordinatorProfile__infoGrid">
        <div className="trainingCoordinatorProfile__infoCard">
          <div className="trainingCoordinatorProfile__infoCardHeading">
            <img src={personalInfoIcon} alt="" className="trainingCoordinatorProfile__infoCardIcon" />
            <h3>Personal Information</h3>
          </div>
          <div className="trainingCoordinatorProfile__infoCardFields">
            {PERSONAL_FIELDS.map(renderPersonalField)}
          </div>
        </div>

        <div className="trainingCoordinatorProfile__infoCard">
          <div className="trainingCoordinatorProfile__infoCardHeading">
            <img src={professionalInfoIcon} alt="" className="trainingCoordinatorProfile__infoCardIcon" />
            <h3>Professional Information</h3>
          </div>
          <div className="trainingCoordinatorProfile__infoCardFields">
            {PROFESSIONAL_FIELDS.map(renderProfessionalField)}
          </div>
        </div>
      </div>

      <div className="trainingCoordinatorProfile__aboutCard">
        <div className="trainingCoordinatorProfile__infoCardHeading">
          <img src={aboutMeIcon} alt="" className="trainingCoordinatorProfile__infoCardIcon" />
          <h3>About Me</h3>
        </div>
        {isEditing ? (
          <>
            <textarea
              className={`trainingCoordinatorProfile__aboutText trainingCoordinatorProfile__aboutText--input${
                errors.aboutMeText ? ' trainingCoordinatorProfile__fieldInput--error' : ''
              }`}
              value={draftProfile.aboutMeText}
              onChange={(e) => handlePersonalChange('aboutMeText', e.target.value)}
            />
            {errors.aboutMeText && (
              <p className="trainingCoordinatorProfile__fieldError">{errors.aboutMeText}</p>
            )}
          </>
        ) : (
          <p className="trainingCoordinatorProfile__aboutText">{savedProfile.aboutMeText}</p>
        )}
      </div>

      {isEditing && (
        <div className="trainingCoordinatorProfile__actionBar">
          <div className="trainingCoordinatorProfile__actionBarButtons">
            <button
              type="button"
              className="trainingCoordinatorProfile__cancelBtn"
              onClick={handleCancel}
            >
              <span className="trainingCoordinatorProfile__cancelIcon" aria-hidden="true" />
              Cancel
            </button>
            <button
              type="button"
              className="trainingCoordinatorProfile__saveBtn"
              onClick={handleSave}
            >
              <span className="trainingCoordinatorProfile__saveIcon" aria-hidden="true" />
              Save Changes
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TrainingCoordinatorProfile;
