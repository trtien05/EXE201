import React from 'react';
import { User, Clock, GraduationCap, Briefcase } from 'lucide-react';
import { Doctor } from '../../lib/api';

interface DoctorInfoProps {
  doctor: Doctor;
}

const DoctorInfo: React.FC<DoctorInfoProps> = ({ doctor }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 md:p-6 mb-6">
      <div className="flex flex-col md:flex-row">
        <div className="w-full md:w-1/3 flex justify-center mb-6 md:mb-0">
          <div className="w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden">
            <img
              src={doctor.doctorAvatar}
              alt={doctor.doctorName}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
        
        <div className="w-full md:w-2/3">
          <h1 className="text-xl md:text-2xl font-bold text-gray-800 mb-2">{doctor.doctorName}</h1>
          <p className="text-gray-600 mb-4 text-sm md:text-base">{doctor.doctorDescription}</p>
          
          <div className="flex items-center mb-3">
            <User className="h-5 w-5 text-[#0077B6] mr-2" />
            <span className="text-gray-700 text-sm md:text-base">Bệnh viện: {doctor.hospitalName}</span>
          </div>
          
          <div className="flex items-center mb-3">
            <Clock className="h-5 w-5 text-[#0077B6] mr-2" />
            <span className="text-gray-700 text-sm md:text-base">
              Phí tư vấn: <span className="font-medium text-[#0077B6]">${doctor.doctorPrice}</span>
            </span>
          </div>

          <div className="flex items-center mb-3">
            <GraduationCap className="h-5 w-5 text-[#0077B6] mr-2" />
            <span className="text-gray-700 text-sm md:text-base">
              Học vấn: {doctor.educations.length} bằng cấp
            </span>
          </div>

          <div className="flex items-center">
            <Briefcase className="h-5 w-5 text-[#0077B6] mr-2" />
            <span className="text-gray-700 text-sm md:text-base">
              Kinh nghiệm: {doctor.workExperiences.length} vị trí công việc
            </span>
          </div>
        </div>
      </div>

      {/* Education Section */}
      {doctor.educations.length > 0 && (
        <div className="mt-6 border-t pt-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
            <GraduationCap className="h-5 w-5 text-[#0077B6] mr-2" />
            Học vấn
          </h3>
          <div className="space-y-3">
            {doctor.educations.map((education) => (
              <div key={education.eduId} className="border-l-4 border-[#0077B6] pl-4">
                <h4 className="font-medium text-gray-800">{education.collegeName}</h4>
                <p className="text-sm text-gray-600 mb-1">{education.description}</p>
                <div className="flex justify-between items-center text-xs text-gray-500">
                  <span>Cấp bởi: {education.issuedBy}</span>
                  <span>{education.issuedYear}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Work Experience Section */}
      {doctor.workExperiences.length > 0 && (
        <div className="mt-6 border-t pt-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
            <Briefcase className="h-5 w-5 text-[#0077B6] mr-2" />
            Kinh nghiệm làm việc
          </h3>
          <div className="space-y-3">
            {doctor.workExperiences.map((experience) => (
              <div key={experience.wexId} className="border-l-4 border-[#0077B6] pl-4">
                <h4 className="font-medium text-gray-800">{experience.jobTitle}</h4>
                <p className="text-sm text-[#0077B6] mb-1">{experience.hospitalName}</p>
                <p className="text-sm text-gray-600 mb-2">{experience.description}</p>
                <p className="text-xs text-gray-500">
                  {new Date(experience.startDate).toLocaleDateString('vi-VN')} - {new Date(experience.endDate).toLocaleDateString('vi-VN')}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default DoctorInfo;