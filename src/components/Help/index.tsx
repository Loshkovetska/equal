import MagnetButton from '../common/MagnetButton'
import PowerTitle from '../common/PowerTitle'
import './help.scss'
import HelpCircle from '../HelpCicle'

const Help = () => {
  return (
    <section className="help-container" >
      <section className="help">
        <div className="help__col">
          <PowerTitle classList="help__title" section="help" />
          <MagnetButton
            wrapperClass="appear help__btn"
            path="/text-us"
            classList="btn-primary btn-md"
            text="Start a project"
          />
        </div>
        <HelpCircle />
      </section>
    </section>
  )
}

export default Help
