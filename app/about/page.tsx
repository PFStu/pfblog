'use client'
import { useLanguage } from '@/contexts/LanguageContext'

export default function AboutPage() {
  const { language } = useLanguage()
  return (
    <>
      <div className="text-center mt-5 mb-5 text-4xl font-bold">{ language === 'zh'? '关于我们' : 'About Us'}</div>
      <div className="text-center mb-5 font-bold hover:bg-blue-500 hover:text-white p-2 rounded-md diplay-inline">{
      language === 'zh'?'我们是PixelForge团队,四名成员:Lcj | Bow,100_1000000,UTF-8s,I Love Scratch,是一群利用学习余下的时间制作优秀软件,作品的学生.'
      :
      'We are PixelForge team, consisting of four members: Lcj | Bow, 100_1000000, UTF-8s, I Love Scratch. We are a group of students who create high-quality software using the remaining time after learning.'
      }
      </div>
      <div className="text-center mt-5 mb-5 text-4xl font-bold">{ language === 'zh'? '网站声明' : 'Website Disclaimer'}</div>
      <div className="text-center mb-5 font-bold hover:bg-blue-500 hover:text-white p-2 rounded-md diplay-inline">{ language === 'zh'? '本网站由PixelForge团队制作,所有内容均为原创,不代表任何组织或个人,如有侵权,请联系我们,我们将及时删除.' : 'This website is created by PixelForge team, all content is original, and does not represent any organization or individual. If there is any infringement, please contact us, we will delete it immediately.'}</div>
      <div className="text-center mt-5 mb-5 text-4xl font-bold">{ language === 'zh'? '外部资源引用说明' : 'External Resource Reference'}</div>
      <div className="text-center mb-5 font-bold hover:bg-blue-500 hover:text-white p-2 rounded-md diplay-inline">{ language === 'zh'? '图标引用:Material Design Icons,版权属于原作者,Apache License 2.0,Open Search UI,版权属于原作者,Apache Lisense 2.0':'Icon Reference: Material Design Icons, copyright belongs to the original author, Apache License 2.0, Open Search UI, copyright belongs to the original author, Apache Lisense 2.0' }</div>
    </>
  );
}