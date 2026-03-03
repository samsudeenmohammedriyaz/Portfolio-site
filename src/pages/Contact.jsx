import PageTransition from '../components/PageTransition'
import {resume} from '../data/resumeData'
export default function Contact(){return(<PageTransition><div className='pt-32 text-center'><h2 className='text-3xl font-semibold mb-4'>Contact</h2><p className='text-gray-600'>{resume.email}</p></div></PageTransition>)}