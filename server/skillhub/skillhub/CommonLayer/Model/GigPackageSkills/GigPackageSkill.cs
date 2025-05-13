namespace skillhub.CommonLayer.Model.GigPackageSkills
{
    public class GigPackageSkill
    {
        public int packageSkillId { get; private set; }
        public int packageId { get; private set; }
        public int skillId { get; private set; }
        public GigPackageSkill(int packageSkillId, int packageId, int skillId)
        {
            this.packageSkillId = packageSkillId;
            this.packageId = packageId;
            this.skillId = skillId;
        }

    }
}
