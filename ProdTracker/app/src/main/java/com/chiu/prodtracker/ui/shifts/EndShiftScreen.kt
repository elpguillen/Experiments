package com.chiu.prodtracker.ui.shifts

import androidx.compose.foundation.layout.Row
import androidx.compose.material3.OutlinedButton
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable

@Composable
fun EndShiftScreen() {
    EndShiftBody()
}

@Composable
fun EndShiftBody() {
    Row {
        OutlinedButton(onClick = {}) {
            Text(text = "End Shift")
        }
    }
}