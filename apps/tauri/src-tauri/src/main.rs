#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]

use tauri::{Builder as TauriBuilder, RunEvent};

mod error;
mod prelude;

fn main() {
    // App builder
    let app = TauriBuilder::default().plugin(tauri_plugin_window_state::Builder::default().build());

    // Run the app
    app.build(tauri::generate_context!())
        .expect("error while running tauri application")
        .run(|_, e| {
            if matches!(e, RunEvent::Ready) {
                println!("Window is ready");
            }
        });
}
