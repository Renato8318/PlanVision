import { motion } from "framer-motion";

function KPICard({ title, value, icon, color, onClick }) {
    return (
        <motion.div
            className="kpi-card"
            style={{ borderLeft: `6px solid ${color}`, cursor: onClick ? 'pointer' : 'default' }}
            onClick={onClick}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            whileHover={{
                scale: 1.04,
                transition: { duration: 0.2 }
            }}
        >
            <div className="kpi-icon" style={{ color: color }}>
                {icon}
            </div>

            <div>

                <h3>{title}</h3>

                <h1>{value}</h1>

            </div>

        </motion.div>
    );
}

export default KPICard;