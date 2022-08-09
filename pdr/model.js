import * as tf from "@tensorflow/tfjs";

class PDR {
	/** @type tf.LayersModel */
	model;
	seq = [];
	result = 0;
	/**
	 *
	 */
	async loadModel() {
        const modelJSON = 'https://raw.githubusercontent.com/jy17347/PDR_Pose_Estimate/develop/models_js/_model_tfjs_/model.json';
		this.model = await tf.loadLayersModel(modelJSON);
		this.seq.splice(0, this.seq.length);
	}

	/**
	 *
	 * @param {tf.Tensor} input
	 * @returns {Promise<number[]>}
	 */
	async predict(input) {
		return await this.model.predict(input).squeeze().array();
	}
}

export const pdr = new PDR();