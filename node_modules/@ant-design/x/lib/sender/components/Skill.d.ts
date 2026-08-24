import React from 'react';
import type { SkillType } from '../interface';
export interface SkillProps extends SkillType {
    prefixCls: string;
    removeSkill: () => void;
}
declare const Skill: React.FC<SkillProps>;
export default Skill;
