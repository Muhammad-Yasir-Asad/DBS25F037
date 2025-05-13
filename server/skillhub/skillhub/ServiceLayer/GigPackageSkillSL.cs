using skillhub.CommonLayer.Model.GigPackageSkills;
using skillhub.Interfaces.IRepositryLayer;
using skillhub.Interfaces.IServiceLayer;
using skillhub.CommonLayer.Model.GigPackageSkills;

namespace skillhub.ServiceLayer
{
    public class GigPackageSkillSL : IGigPackageSkillSL
    {
        public readonly IGigPackageSkillRL gigPackageSkillRL;
        public GigPackageSkillSL(IGigPackageSkillRL gigPackageSkillRL)
        {
            this.gigPackageSkillRL = gigPackageSkillRL;
        }
        public Task<bool> AddGigPackageSkill(GigPackageSkillRequest packageSkill)
        {
            GigPackageSkill gigpackageskill = new GigPackageSkill(packageSkill.packageSkillId, packageSkill.packageId, packageSkill.skillId);
            return gigPackageSkillRL.AddGigPackageSkill(gigpackageskill);
        }
        public Task<bool> UpdateGigPackageSkill(GigPackageSkillRequest packageSkill)
        {
            GigPackageSkill gigpackageskill = new GigPackageSkill(packageSkill.packageSkillId, packageSkill.packageId, packageSkill.skillId);
            return gigPackageSkillRL.UpdateGigPackageSkill(gigpackageskill);
        }
    }

}
