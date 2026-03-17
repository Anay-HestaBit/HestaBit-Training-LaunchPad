# Training Report - Week 8 Day 2

## Model

I used TinyLlama 1.1B as the base model, loaded in 4-bit precision using QLoRA.
This allowed the model to fit in under 1GB of VRAM instead of the usual 14GB.
Only 0.20% of the total parameters were actually trained — the rest stayed frozen.

- base_model : TinyLlama/TinyLlama-1.1B-Chat-v1.0
- loading : 4-bit quantization (QLoRA)
- total_params : 1.1 Billion
- trainable_params: 2,252,800 (0.20%)
- vram_used : 0.77 GB

## Dataset

I used my own cleaned CodeAlpaca dataset covering coding tasks like writing functions,
fixing bugs, and explaining algorithms.

- train_samples : 1,200
- validation_samples: 300
- domain : Coding (CodeAlpaca-20k)

## Configuration

LoRA rank was set to 16 targeting q_proj and v_proj layers.
Optimizer paged_adamw_8bit was used for memory efficient training.

- rank (r) : 16
- lora_alpha : 32
- dropout : 0.05
- target_modules : q_proj, v_proj
- epochs : 3
- batch_size : 4
- learning_rate : 2e-4
- optimizer : paged_adamw_8bit

## Results

Training loss decreased consistently across epochs which means the model learned well.
Validation loss stayed stable which means no overfitting occurred.

- epoch_1_train_loss : 0.8049
- epoch_2_train_loss : 0.7884
- epoch_3_train_loss : 0.7359
- epoch_1_val_loss : 0.7852
- epoch_2_val_loss : 0.7822
- epoch_3_val_loss : 0.7842

## Output Files

- adapters/adapter_model.safetensors
- adapters/adapter_config.json
- adapters/tokenizer.json
