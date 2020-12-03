import { getMemberById } from "../services/memberService";

export async function getMemberProfilePic(memberId) {
  const boss = await getMemberById(memberId);
  if (boss.status == 200) {
    let member = await boss.json();
    let pic = await member.profilePic;
    console.log(pic);
    return pic;
  }
  return "";
}
