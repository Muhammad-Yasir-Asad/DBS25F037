using skillhub.CommonLayer.Model.GigPackages;
using skillhub.CommonLayer.Model.GigPackageSkills;

namespace skillhub.Interfaces.IServiceLayer
{
    public interface IGigPackageSkillSL
    {
        public Task<bool> AddGigPackageSkill(GigPackageSkillRequest packageSkill);
        public Task<bool> UpdateGigPackageSkill(GigPackageSkillRequest packageSkill);



    }
}
