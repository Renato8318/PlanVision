import { motion } from "framer-motion";

function ModuleCard({

    title,

    description,

    icon,

    onClick

}) {

    return (

        <motion.div

            className="module-card"

            style={{ cursor: onClick ? 'pointer' : 'default' }}

            onClick={onClick}

            initial={{ opacity: 0 }}

            animate={{ opacity: 1 }}

            whileHover={{

                y: -8,

                transition: {

                    duration: .2

                }

            }}

        >

            <div className="module-icon">

                {icon}

            </div>

            <h3>

                {title}

            </h3>

            <p>

                {description}

            </p>

        </motion.div>

    );

}

export default ModuleCard;